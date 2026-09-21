#!/usr/bin/env node
// sync-upstream.mjs — re-vendor the canonical toolkit at a chosen commit.
//
// The skills and runtime here are a pinned copy of geo-explorers/content-management. This
// tool moves the pin: it fetches that repository's archive over HTTPS (no git account needed
// — the same route the team's own self-heal procedure uses), replaces the vendored paths,
// regenerates the skill stubs and records the new commit.
//
// It touches ONLY vendored paths. docs/, context/, .claude/, tools/, config/, README.md,
// AGENTS.md, CLAUDE.md, SETUP.md and UPSTREAM.md are this repository's own and are left alone
// (UPSTREAM.md gets its pin line updated).
//
// Usage:  node tools/sync-upstream.mjs [--ref main|<sha>|<tag>] [--from <local clone path>] [--dry-run]
import { existsSync, mkdtempSync, rmSync, cpSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const UPSTREAM = 'geo-explorers/content-management';
const VENDORED_DIRS = ['skills', 'src', 'lib', 'scripts', 'skill-dev', 'documentation'];
const VENDORED_FILES = ['package.json', 'package-lock.json', 'tsconfig.json', '.env.example', 'LICENSE', 'knowledge-graph-ontology.md', 'validate_migration.ts'];
// Only the operating contract is carried over. Upstream's agents/README.md and MD-FILES.md
// describe that repository's layout (agents/ folder, its own CLAUDE.md), which is not this one.
const AGENT_DOCS = ['AGENT-WORKFLOW.md'];   // → docs/toolkit/agents-<name>
const UPSTREAM_ONLY_AGENT_DOCS = ['MD-FILES.md', 'README.md'];
// Upstream paths that are maintainer tooling or dated diagnostics — an editor's agent never
// runs them. Removed after every sync so the tree stays lean (UPSTREAM.md lists them).
const PRUNE = [
  'skill-dev/skill-quality-check', 'skill-dev/sync-skills.sh', 'skill-dev/README.md', 'skills/README.md',
  'scripts/check-space-list.ts', 'scripts/2026-07-28-sdk-v020-migration-check.ts',
];
// Upstream agent definitions assume upstream's layout; these rewrites map them onto this one.
const REWRITES = [
  ['bash skill-dev/sync-skills.sh', 'node tools/sync-upstream.mjs'],
  ['agents/AGENT-WORKFLOW.md', 'docs/toolkit/agents-AGENT-WORKFLOW.md'],
  ['content-management/documentation/', 'documentation/'],
];

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const ref = opt('--ref', 'main');
const from = opt('--from');
const DRY = argv.includes('--dry-run');
if (!existsSync('AGENTS.md') || !existsSync('tools/gen-skill-stubs.mjs')) { console.error('Run from the repository root.'); process.exit(2); }

let src, sha;
if (from) {
  src = from;
  const r = spawnSync('git', ['-C', from, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
  sha = r.status === 0 ? r.stdout.trim() : 'unknown (local copy)';
  console.log(`source: local clone ${from} @ ${sha}`);
} else {
  // Resolve the ref to a commit first so the pin is exact even when --ref is a branch.
  const meta = await (await fetch(`https://api.github.com/repos/${UPSTREAM}/commits/${ref}`, { headers: { 'User-Agent': 'geo-editor-agent-sync' } })).json();
  if (!meta.sha) { console.error(`could not resolve ${UPSTREAM}@${ref}: ${meta.message || 'no sha in response'}`); process.exit(1); }
  sha = meta.sha;
  console.log(`source: https://github.com/${UPSTREAM} @ ${sha}`);
  const tmp = mkdtempSync(join(tmpdir(), 'geo-sync-'));
  const tgz = join(tmp, 'src.tgz');
  const res = await fetch(`https://github.com/${UPSTREAM}/archive/${sha}.tar.gz`);
  if (!res.ok) { console.error(`download failed: ${res.status}`); process.exit(1); }
  writeFileSync(tgz, Buffer.from(await res.arrayBuffer()));
  const t = spawnSync('tar', ['-xzf', tgz, '-C', tmp], { stdio: 'inherit' });
  if (t.status !== 0) { console.error('tar extraction failed — is tar on PATH?'); process.exit(1); }
  src = join(tmp, readdirSync(tmp).find((d) => statSync(join(tmp, d)).isDirectory()));
}

const current = existsSync('.upstream-sha') ? readFileSync('.upstream-sha', 'utf8').trim() : '(none)';
console.log(`current pin: ${current}\nnew pin:     ${sha}${DRY ? '\n(dry run — nothing will change)' : ''}\n`);

for (const d of VENDORED_DIRS) {
  const s = join(src, d);
  if (!existsSync(s)) { console.log(`  – ${d}/ not in upstream, skipped`); continue; }
  console.log(`  ↻ ${d}/`);
  if (DRY) continue;
  rmSync(d, { recursive: true, force: true });
  cpSync(s, d, { recursive: true });
}
for (const f of VENDORED_FILES) {
  const s = join(src, f);
  if (!existsSync(s)) { console.log(`  – ${f} not in upstream, skipped`); continue; }
  console.log(`  ↻ ${f}`);
  if (!DRY) cpSync(s, f);
}
for (const p of PRUNE) {
  if (!existsSync(p)) continue;
  console.log(`  ✂ ${p}`);
  if (!DRY) rmSync(p, { recursive: true, force: true });
}
for (const f of AGENT_DOCS) {
  const s = join(src, 'agents', f);
  if (!existsSync(s)) continue;
  console.log(`  ↻ docs/toolkit/agents-${f}`);
  if (!DRY) cpSync(s, join('docs', 'toolkit', `agents-${f}`));
}
// Upstream agent definitions that this repo also ships — refresh the ones it already has.
for (const f of readdirSync(join(src, 'agents')).filter((x) => x.endsWith('.md') && !AGENT_DOCS.includes(x) && !UPSTREAM_ONLY_AGENT_DOCS.includes(x))) {
  const dst = join('.claude', 'agents', f);
  if (!existsSync(dst)) { console.log(`  – new upstream agent ${f} (not installed; copy it into .claude/agents/ if wanted)`); continue; }
  console.log(`  ↻ ${dst}`);
  if (DRY) continue;
  cpSync(join(src, 'agents', f), dst);
  const text = readFileSync(dst, 'utf8');
  const rewritten = REWRITES.reduce((t, [from, to]) => t.split(from).join(to), text);
  if (rewritten !== text) writeFileSync(dst, rewritten);
}

if (!DRY) {
  writeFileSync('.upstream-sha', sha + '\n');
  if (existsSync('UPSTREAM.md')) {
    const u = readFileSync('UPSTREAM.md', 'utf8').replace(/(content-management[^\n]*?@ `)[0-9a-f]{7,40}(`)/, `$1${sha}$2`).replace(/(Vendored on:\s*)\d{4}-\d{2}-\d{2}/, `$1${new Date().toISOString().slice(0, 10)}`);
    writeFileSync('UPSTREAM.md', u);
  }
  spawnSync(process.execPath, ['tools/gen-skill-stubs.mjs'], { stdio: 'inherit' });
  console.log(`\n✓ pinned to ${sha}. Now: npm ci  →  node --env-file=.env tools/doctor.mjs  →  review \`git diff\` and commit.`);
} else console.log('\n(dry run complete)');
