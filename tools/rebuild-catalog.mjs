#!/usr/bin/env node
// rebuild-catalog.mjs — regenerate docs/CATALOG.json from the exported files themselves.
//
// Every file tools/export-docs.mjs writes carries a provenance header (page URL, key, level,
// status). This reads those headers back, so the catalog can be rebuilt after files are
// removed or moved without a round-trip to Notion. Paths are repository-relative.
//
// Usage:  node tools/rebuild-catalog.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CATALOG_DB = '28ae8943f8ab4e5d8e7fa6dc4d8e05d6';
const docs = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!entry.endsWith('.md')) continue;
    const s = readFileSync(p, 'utf8');
    const page = (/Page:\s+https:\/\/app\.notion\.com\/p\/([0-9a-f]{32})/.exec(s) || [])[1];
    if (!page) continue;                                   // not an exported catalog doc
    const key = (/Key:\s+(\S+)/.exec(s) || [])[1] || null;
    const level = (/Level:\s+(.*?)\s{2,}Status:/.exec(s) || [])[1]?.trim() || null;
    const status = (/Status:\s+(.*?)\s{2,}Form:/.exec(s) || [])[1]?.trim() || null;
    const rel = p.split(/[\\/]/).slice(1).join('/');       // strip the leading "docs"
    docs.push({ key, file: rel, level, status, page });
  }
}
walk('docs');
docs.sort((a, b) => a.file.localeCompare(b.file));
const existing = (() => { try { return JSON.parse(readFileSync('docs/CATALOG.json', 'utf8')); } catch { return {}; } })();
writeFileSync('docs/CATALOG.json', JSON.stringify({
  exportedAt: existing.exportedAt || new Date().toISOString().slice(0, 10),
  rebuiltAt: new Date().toISOString().slice(0, 10),
  catalogDb: CATALOG_DB,
  note: 'Maintainer-only, template and identity rows are not exported; tools/export-docs.mjs skips them by key.',
  docs,
}, null, 2) + '\n');
console.log(`docs/CATALOG.json: ${docs.length} exported documents`);
