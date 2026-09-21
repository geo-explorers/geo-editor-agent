#!/usr/bin/env node
// install.mjs — one command from fresh clone to working toolkit.
//
// What it does, in order, and stops where only a human can act:
//   1. checks Node 22+
//   2. npm ci                       (the Geo SDK the skill scripts import)
//   3. .env from .env.example        (created only if absent; NEVER overwritten; key left blank)
//   4. regenerates skill stubs       (.claude/skills — Claude Code discovery)
//   5. optionally deploys the full skills to other hosts (--host codex | claude-desktop | all)
//   6. runs tools/doctor.mjs
//
// It never asks for, reads, or writes a wallet key. That step is the human's.
//
// Usage:  node tools/install.mjs [--host claude-code|codex|claude-desktop|all] [--skip-npm]
import { existsSync, copyFileSync, mkdirSync, readdirSync, cpSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { homedir } from 'node:os';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const host = opt('--host', 'claude-code');
const skipNpm = argv.includes('--skip-npm');
const step = (t) => console.log(`\n▸ ${t}`);
// shell:true is needed on Windows only for npm (a .cmd shim); node's own path may contain spaces (C:\Program Files) and must not go through a shell.
const run = (cmd, args) => { const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' && cmd !== process.execPath }); if (r.status !== 0) { console.error(`\n✗ ${cmd} ${args.join(' ')} failed (exit ${r.status})`); process.exit(1); } };

if (!existsSync('AGENTS.md') || !existsSync('skills')) { console.error('Run this from the repository root (where AGENTS.md and skills/ are).'); process.exit(2); }

step('1/6  Node version');
const major = Number(process.versions.node.split('.')[0]);
if (major < 22) { console.error(`  ✗ node ${process.versions.node} — this toolkit needs Node 22 or newer (its type stripping runs the .ts skill scripts). Install from https://nodejs.org and re-run.`); process.exit(1); }
console.log(`  ✓ node ${process.versions.node}`);

step('2/6  Dependencies');
if (skipNpm) console.log('  – skipped (--skip-npm)');
else { run('npm', ['ci', '--no-audit', '--no-fund']); console.log('  ✓ npm ci'); }

step('3/6  .env');
if (existsSync('.env')) console.log('  ✓ .env already exists — left untouched');
else { copyFileSync('.env.example', '.env'); console.log('  ✓ created .env from .env.example\n    → Open .env in a text editor. Read-only work needs nothing. To publish, paste your key after GEO_PRIVATE_KEY=\n      (export it at https://www.geobrowser.io/export-wallet — "Copy key", not the address). Never paste it into a chat.'); }

step('4/6  Skill discovery stubs (Claude Code)');
run(process.execPath, ['tools/gen-skill-stubs.mjs']);

step('5/6  Other hosts');
const targets = [];
if (host === 'codex' || host === 'all') targets.push(join(homedir(), '.codex', 'skills'));
if (host === 'claude-desktop' || host === 'all') {
  console.log('  Claude Desktop: Settings → Capabilities → Code execution and file creation → allow api-testnet.geobrowser.io (and api.notion.com for Notion work).');
  console.log('                  Then "Work in project or file" → select this folder. Skills are read from skills/<tier>/<name>/ as documents.');
}
if (!targets.length && host === 'claude-code') console.log('  Claude Code needs nothing more — .claude/skills and .claude/agents load at startup. Start a NEW session in this folder.');
for (const t of targets) {
  mkdirSync(t, { recursive: true });
  let n = 0;
  for (const tier of ['actionable', 'non-actionable']) for (const s of readdirSync(join('skills', tier))) {
    const src = join('skills', tier, s); if (!existsSync(join(src, 'SKILL.md'))) continue;
    const dst = join(t, s); rmSync(dst, { recursive: true, force: true }); cpSync(src, dst, { recursive: true }); n++;
  }
  console.log(`  ✓ deployed ${n} skills to ${t} (full copies — Codex has no repo context to follow a stub). Restart Codex.`);
  if (host === 'codex' || host === 'all') console.log('    Codex network: add to ~/.codex/config.toml →\n      [permissions.workspace.network]\n      enabled = true\n      mode = "limited"\n      [permissions.workspace.network.domains]\n      "api-testnet.geobrowser.io" = "allow"\n      "api.notion.com" = "allow"');
}

step('6/6  Doctor');
const d = spawnSync(process.execPath, ['--env-file=.env', 'tools/doctor.mjs'], { stdio: 'inherit' });
console.log(d.status === 0 ? '\n✓ Installed. Start a new session in this folder and ask for a job by name — "use geo-query to…".' : '\n! Installed, but doctor found problems above. Fix them, then: node --env-file=.env tools/doctor.mjs');
process.exit(d.status === 0 ? 0 : 1);
