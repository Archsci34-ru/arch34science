import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'article.html']) await cp(path.join(root, file), path.join(out, file));
try { await cp(path.join(root, 'CNAME'), path.join(out, 'CNAME')); } catch { /* custom domain is optional in local previews */ }
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
const journalDir = path.join(root, 'content', 'journal');
let journal = [];
try {
  for (const file of await readdir(journalDir)) {
    if (!file.endsWith('.json')) continue;
    const article = JSON.parse(await readFile(path.join(journalDir, file), 'utf8'));
    if (article.published === false) continue;
    if (!article.slug || !/^[a-z0-9][a-z0-9-]*$/.test(article.slug)) {
      throw new Error(`Invalid journal article slug in ${file}: use Latin letters, numbers, and hyphens.`);
    }
    journal.push(article);
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await mkdir(path.join(out, 'data'), { recursive: true });
await writeFile(path.join(out, 'data', 'articles.json'), JSON.stringify({ articles }, null, 2), 'utf8');
await writeFile(path.join(out, 'data', 'pages.json'), JSON.stringify({ pages }, null, 2), 'utf8');
await writeFile(path.join(out, 'data', 'journal.json'), JSON.stringify({ articles: journal }, null, 2), 'utf8');

// GitHub Pages does not support Netlify's SPA redirects, so emit a real entry
// page for every route. This keeps direct links working with an HTTP 200.
const routes = [
  '/', '/stone-age', '/stone-age/paleolithic', '/stone-age/mesolithic',
  '/stone-age/neolithic', '/stone-age/eneolithic', '/bronze-age',
  '/bronze-age/yamnaya', '/bronze-age/catacomb', '/bronze-age/srubnaya',
  '/early-iron-age', '/early-iron-age/cimmerian', '/early-iron-age/sauromatian',
  '/early-iron-age/sarmatian', '/early-iron-age/hunnic', '/middle-ages',
  '/library', '/news', '/journal', '/about',
  ...journal.map(article => `/journal/${article.slug}`)
];
for (const route of routes) {
  if (route === '/') continue;
  const routeDir = path.join(out, route.slice(1));
  await mkdir(routeDir, { recursive: true });
  await cp(path.join(root, 'index.html'), path.join(routeDir, 'index.html'));
}
