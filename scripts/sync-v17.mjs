import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'reference-v17');
const publicRoot = path.join(root, 'public');
const legacy = path.join(publicRoot, 'legacy');

const build = spawnSync('python3', ['build.py'], {
  cwd: source,
  stdio: 'inherit',
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

await mkdir(legacy, { recursive: true });
await cp(path.join(source, 'assets'), path.join(publicRoot, 'assets'), {
  recursive: true,
  force: true,
});
await cp(path.join(source, 'downloads'), path.join(publicRoot, 'downloads'), {
  recursive: true,
  force: true,
});

// Preserve the complete V17 app and add only the new theme and an absolute PDF base.
const additions = '<meta name="wagmix-download-base" content="/downloads/"><link rel="stylesheet" href="/legacy-theme.css">';
for (const filename of ['index.html', 'WAGMIx_繁體中文_V17.html', 'WAGMIx_English_V17.html']) {
  const html = await readFile(path.join(source, filename), 'utf8');
  if (!html.includes('</head>')) throw new Error(`No head in ${filename}`);
  await writeFile(path.join(legacy, filename), html.replace('</head>', `${additions}</head>`));
}

console.log('Synced the complete bilingual V17 site to public/legacy.');
