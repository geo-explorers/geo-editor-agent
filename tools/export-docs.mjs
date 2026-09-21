#!/usr/bin/env node
// export-docs.mjs — pull the team's instruction documents out of the Notion catalog into docs/.
//
// The Agent Composition catalog ("MDs & documents") is the canonical editorial home for
// ~25 team-written guides — CLAIMS.md, SESSION.md, NOTION.md, lessons.md, the role and
// platform guides — that have no file in any repo. This exporter gives them one, so a fresh
// clone carries the whole instruction layer.
//
// Each catalog page is "Document specification" (editorial metadata) followed by
// "# Working content" (the actual instructions). Only the working content is exported.
// Rows whose origin is "Link to existing source" are skipped: the file they point at is
// already vendored under skills/, docs/toolkit/ or documentation/.
//
// Read-only on Notion. Needs NOTION_TOKEN (run with --env-file=.env from the repo root).
//
// Usage:
//   node --env-file=.env tools/export-docs.mjs [--out docs] [--db <catalogDbId>] [--dry-run]
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const CATALOG_DB = '28ae8943f8ab4e5d8e7fa6dc4d8e05d6';   // MDs & documents (Agent Composition)
const READER = 'scripts/notion-read.mjs';
const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const OUT = opt('--out', 'docs');
const DB = opt('--db', CATALOG_DB);
const DRY = argv.includes('--dry-run');
if (!process.env.NOTION_TOKEN) { console.error('NOTION_TOKEN missing — run with: node --env-file=.env tools/export-docs.mjs'); process.exit(2); }

function read(args) {
  const r = spawnSync(process.execPath, ['--env-file=.env', READER, ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${READER} ${args.join(' ')} failed:\n${r.stderr || r.stdout}`);
  return r.stdout;
}

// ── 1. list the catalog ──────────────────────────────────────────────────────
const PROPS = ['Key', 'Name', 'Filename', 'Document level', 'Document origin', 'Document status', 'Document form', 'Summary'];
const listing = read(['rows', DB, '--limit', '100', '--props', PROPS.join(',')]);
const rows = [];
for (const line of listing.split(/\r?\n/)) {
  const m = /^([0-9a-f]{32})\s+(.*)$/.exec(line);
  if (!m) continue;
  const props = {};
  for (const part of m[2].split(/\s+\|\s+/)) { const eq = part.indexOf('='); if (eq > 0) props[part.slice(0, eq).trim()] = part.slice(eq + 1).trim(); }
  rows.push({ id: m[1], ...props });
}
console.log(`catalog: ${rows.length} rows`);

// ── 2. decide what to export and where ───────────────────────────────────────
const stripLink = (s) => (s || '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// Filenames that would collide with files hosts scan for real instructions or skills.
// A docs/reference/SKILL.md or docs/templates/AGENTS.md can be mistaken for the real thing.
const RENAME = { 'skill-anatomy': 'skill-anatomy.md', 'agents': 'AGENTS.template.md', 'readme': 'agent-README.template.md' };
function place(r) {
  const key = r.Key || slug(r.Name || r.id);
  const filename = RENAME[key] || stripLink(r.Filename) || `${key}.md`;
  const level = r['Document level'] || '';
  const status = r['Document status'] || '';
  let dir = '';
  if (/^role-/.test(key)) dir = 'roles';
  else if (/^platform-/.test(key)) dir = 'platforms';
  else if (/Template to fill in/i.test(status)) dir = 'templates';
  else if (/Reference and setup/i.test(level)) dir = 'reference';
  return { key, rel: dir ? `${dir}/${filename}` : filename };
}
// Catalog rows that are for library maintainers, agent authors, or one specific agent's
// identity — the catalog marks most of them "Not distributed to agents". An editor's agent
// never needs them, and several describe a folder layout this repository does not use.
const NOT_FOR_AGENTS = new Set([
  'character',          // one agent's identity notes (reference only)
  'md-research',        // the research report behind the naming decisions
  'files',              // library-maintenance.md — catalog maintenance proposal
  'layout',             // folder design guide — "Not distributed to agents"
  'core',               // the Notion library map
  'skill-anatomy',      // what a SKILL.md is — for skill authors
  'platform-claude-code', 'platform-cowork', 'platform-openai',   // SETUP.md is the operational version
  'agents', 'readme', 'portable-core', 'skillroutes',              // templates for authoring a new agent
]);
const skip = (r) => /Link to existing source/i.test(r['Document origin'] || '') || NOT_FOR_AGENTS.has(r.Key || '');

// ── 3. render and write ──────────────────────────────────────────────────────
let written = 0, skipped = 0, empty = 0;
const manifest = [];
for (const r of rows) {
  if (skip(r)) { skipped++; continue; }
  const { key, rel } = place(r);
  const md = read(['page', r.id, '--depth', '6']);
  const idx = md.search(/^#\s*Working content\s*$/m);
  const body = (idx >= 0 ? md.slice(idx).replace(/^#\s*Working content\s*\r?\n/, '') : md).trim();
  if (!body) { empty++; console.log(`  (empty) ${key}`); continue; }
  const header = [
    `<!--`,
    `  Exported from the Agent Composition catalog (Notion) — the canonical editorial source.`,
    `  Page:    https://app.notion.com/p/${r.id}`,
    `  Key:     ${key}`,
    `  Level:   ${r['Document level'] || '?'}   Status: ${r['Document status'] || '?'}   Form: ${r['Document form'] || '?'}`,
    `  Summary: ${r.Summary || ''}`,
    `  Exported: ${new Date().toISOString().slice(0, 10)} by tools/export-docs.mjs — re-run to refresh; do not hand-edit here.`,
    `-->`,
    ``,
    `# ${stripLink(r.Name) || key}`,
    ``,
  ].join('\n');
  const out = join(OUT, rel);
  manifest.push({ key, file: rel.replace(/\\/g, '/'), level: r['Document level'], status: r['Document status'], page: r.id });
  if (DRY) { console.log(`  would write ${out}`); continue; }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, header + body + '\n');
  written++;
  console.log(`  ${out}`);
}
if (!DRY) writeFileSync(join(OUT, 'CATALOG.json'), JSON.stringify({ exportedAt: new Date().toISOString(), catalogDb: DB, docs: manifest }, null, 2) + '\n');
console.log(`\nwritten ${written} · skipped ${skipped} (link to an existing repo file) · empty ${empty}`);
