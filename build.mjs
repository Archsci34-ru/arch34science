import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'article.html']) await cp(path.join(root, file), path.join(out, file));
try { await cp(path.join(root, '_redirects'), path.join(out, '_redirects')); } catch { /* optional Netlify redirects */ }
for (const folder of ['admin', 'assets']) {
  try { await cp(path.join(root, folder), path.join(out, folder), { recursive: true }); } catch { /* folder is optional */ }
}
const articleDir = path.join(root, 'content', 'articles');
let articles = [];
try {
  for (const file of await readdir(articleDir)) {
    if (!file.endsWith('.json')) continue;
    articles.push(JSON.parse(await readFile(path.join(articleDir, file), 'utf8')));
  }
} catch { /* an empty article collection is valid */ }
const pageDir = path.join(root, 'content', 'pages');
let pages = [];
try {
  for (const file of await readdir(pageDir)) {
    if (!file.endsWith('.json')) continue;
    pages.push(JSON.parse(await readFile(path.join(pageDir, file), 'utf8')));
  }
} catch { /* pages can be filled in later */ }
await mkdir(path.join(out, 'data'), { recursive: true });
await writeFile(path.join(out, 'data', 'articles.json'), JSON.stringify({ articles }, null, 2), 'utf8');
await writeFile(path.join(out, 'data', 'pages.json'), JSON.stringify({ pages }, null, 2), 'utf8');
