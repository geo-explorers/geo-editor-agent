#!/usr/bin/env node
// doctor.mjs — is this checkout ready to work? Read-only; changes nothing; prints no secrets.
//
// Usage:  node --env-file=.env tools/doctor.mjs      (without --env-file it still runs; the
//         env checks then report what is missing from the process environment)
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const GEO = 'https://api-testnet.geobrowser.io/graphql';
const RETIRED = 'testnet-api.geobrowser.io';
let fails = 0, warns = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const warn = (m) => { warns++; console.log(`  ! ${m}`); };
const fail = (m) => { fails++; console.log(`  ✗ ${m}`); };
const head = (t) => console.log(`\n${t}`);

// ── runtime ─────────────────────────────────────────────────────────────────
head('Runtime');
const major = Number(process.versions.node.split('.')[0]);
major >= 22 ? ok(`node ${process.versions.node}`) : fail(`node ${process.versions.node} — need 22+ (type stripping runs the .ts skill scripts)`);
existsSync('node_modules/@geoprotocol/geo-sdk') ? ok('dependencies installed (node_modules/@geoprotocol/geo-sdk present)') : fail('dependencies missing — run: npm ci');
for (const p of ['src/functions.ts', 'lib/gql.mjs', 'scripts/notion-read.mjs', 'skills/SKILL-VERSIONS.json']) existsSync(p) ? ok(p) : fail(`${p} missing — checkout incomplete`);

// ── env (names only, never values) ─────────────────────────────────────────
head('Environment (.env — variable names only, values are never read)');
if (!existsSync('.env')) fail('.env missing — copy .env.example to .env (tools/install.mjs does this) and fill it in by hand');
else {
  const names = new Set(readFileSync('.env', 'utf8').split(/\r?\n/).map((l) => (/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(l) || [])[1]).filter(Boolean));
  const placeholderKey = /GEO_PRIVATE_KEY\s*=\s*"?0x<private_key>/.test(readFileSync('.env', 'utf8'));
  // A real internal-integration token starts with ntn_ (older ones secret_). Anything else
  // is the example's placeholder text. Only the prefix is inspected; the value is never printed.
  const notionReal = /^(ntn_|secret_)/.test(String(process.env.NOTION_TOKEN || ''));
  if (!names.has('NOTION_TOKEN')) warn('NOTION_TOKEN not set — Notion scripts and mirrors will not run (fine for Geo-only lookups)');
  else if (!notionReal) warn('NOTION_TOKEN is still the placeholder — Notion work unavailable until you paste a token (SETUP.md, step 2)');
  else ok('NOTION_TOKEN present (not read)');
  if (!names.has('GEO_PRIVATE_KEY')) ok('GEO_PRIVATE_KEY not set — read-only mode; publishing skills unavailable (fine for lookups, mirrors, grouping)');
  else if (placeholderKey) ok('GEO_PRIVATE_KEY still the placeholder — read-only mode until a human fills it');
  else ok('GEO_PRIVATE_KEY present (not read) — publishing skills can run their gated writes');
}

// ── skills ──────────────────────────────────────────────────────────────────
head('Skills');
const tiers = ['skills/actionable', 'skills/non-actionable'];
const skills = tiers.flatMap((t) => existsSync(t) ? readdirSync(t).filter((d) => existsSync(`${t}/${d}/SKILL.md`)).map((d) => `${t}/${d}`) : []);
skills.length ? ok(`${skills.length} toolkit skills present`) : fail('no skills found under skills/');
const stubCheck = spawnSync(process.execPath, ['tools/gen-skill-stubs.mjs', '--check'], { encoding: 'utf8' });
stubCheck.status === 0 ? ok('discovery stubs in .claude/skills are current') : warn('discovery stubs stale — run: node tools/gen-skill-stubs.mjs');
const bad = skills.filter((s) => readFileSync(`${s}/SKILL.md`, 'utf8').includes(RETIRED));
bad.length ? warn(`${bad.length} skill(s) still mention the retired endpoint ${RETIRED}: ${bad.map((s) => s.split('/').pop()).join(', ')}`) : ok('no skill references the retired endpoint');

// integrity manifest (python) — optional
const py = ['python3', 'python'].map((c) => ({ c, r: spawnSync(c, ['--version'], { encoding: 'utf8' }) })).find((x) => x.r.status === 0 && /Python 3/.test(x.r.stdout + x.r.stderr));
if (!py) warn('python3 not found — skipped skill integrity check (skill-dev/skill_versions.py verify)');
else if (!existsSync('.git')) warn('not a git checkout — skipped skill integrity check (it hashes git-tracked files)');
else {
  const v = spawnSync(py.c, ['skill-dev/skill_versions.py', 'verify'], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
  v.status === 0 ? ok('every skill matches its approved version (SKILL-VERSIONS.json)') : fail(`skill integrity check failed:\n${(v.stdout + v.stderr).split('\n').filter((l) => /DRIFT|MISSING|UNLISTED/.test(l)).map((l) => '      ' + l.trim()).join('\n') || (v.stdout + v.stderr).slice(-400)}`);
}

// ── connectivity ────────────────────────────────────────────────────────────
head('Connectivity');
try {
  const r = await fetch(GEO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: '{ entitiesConnection(typeId: "96f859efa1ca4b229372c86ad58b694b", spaceId: "41e851610e13a19441c4d980f2f2ce6b", first: 1) { totalCount } }' }), signal: AbortSignal.timeout(15000) });
  const j = await r.json();
  const n = j?.data?.entitiesConnection?.totalCount;
  Number.isFinite(n) ? ok(`Geo reachable — AI space has ${n} claims right now`) : fail(`Geo answered but not as expected: ${JSON.stringify(j).slice(0, 160)}`);
} catch (e) { fail(`Geo unreachable at ${GEO} — ${e.message}. Sandboxed host? allowlist api-testnet.geobrowser.io (see SETUP.md)`); }

if (/^(ntn_|secret_)/.test(String(process.env.NOTION_TOKEN || ''))) {
  try {
    const r = await fetch('https://api.notion.com/v1/users/me', { headers: { Authorization: `Bearer ${process.env.NOTION_TOKEN}`, 'Notion-Version': '2022-06-28' }, signal: AbortSignal.timeout(15000) });
    const j = await r.json();
    r.ok ? ok(`Notion token valid — integration "${j.name}"${j.bot?.workspace_name ? ` in workspace "${j.bot.workspace_name}"` : ''}`) : fail(`Notion rejected the token (${r.status} ${j.code || ''}) — regenerate it in Notion → Connections`);
  } catch (e) { fail(`Notion unreachable — ${e.message}. Sandboxed host? allowlist api.notion.com`); }
} else if (process.env.NOTION_TOKEN) { /* placeholder — already warned above */ }
else warn('NOTION_TOKEN not in process env — run with --env-file=.env to test the Notion connection');

// ── verdict ─────────────────────────────────────────────────────────────────
console.log('');
if (fails) { console.log(`✗ ${fails} problem(s), ${warns} warning(s). Fix the ✗ lines above before working.`); process.exit(1); }
console.log(warns ? `✓ ready, with ${warns} warning(s) above.` : '✓ ready.');
