// Genera el sitio estático en dist/.
//   node build.mjs          → construye
//   node build.mjs --serve  → construye y lo sirve en http://localhost:4321 (para probar)
import { mkdir, writeFile, rm, cp, readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join, extname } from 'node:path';
import { SITE, LANGS, ROUTES } from './src/config.js';
import en from './src/i18n/en.js';
import es from './src/i18n/es.js';
import { page, path } from './src/layout.js';
import * as P from './src/pages.js';

const OUT = 'dist';
const TEXT = { en, es };

const BODIES = {
  home: (L) => P.home(L),
  about: (L) => P.about(L),
  services: (L) => P.services(L),
  projects: (L) => P.projects(L),
  beforeAfter: (L) => P.beforeAfterPage(L),
  miami: (L) => P.market(L, 'miami'),
  vegas: (L) => P.market(L, 'vegas'),
  estimate: (L) => P.estimate(L),
  contact: (L) => P.contact(L),
  privacy: (L) => P.privacy(L),
  terms: (L) => P.terms(L),
};

async function build() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await cp('assets', join(OUT, 'assets'), { recursive: true });

  let count = 0;
  for (const lang of LANGS) {
    const L = TEXT[lang];
    for (const r of ROUTES) {
      const dir = join(OUT, path(lang, r.key));
      await mkdir(dir, { recursive: true });
      const bodyClass = r.key === 'home' ? 'is-home' : '';
      await writeFile(join(dir, 'index.html'), page(L, r.key, r.key, BODIES[r.key](L), bodyClass));
      count++;
    }
  }
  await writeFile(join(OUT, '404.html'), page(en, 'notFound', null, P.notFound(en)));

  // SEO: sitemap con las dos versiones de idioma de cada página.
  const urls = ROUTES.flatMap((r) => LANGS.map((lang) => {
    const alts = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE.url}/${path(l, r.key)}"/>`).join('');
    return `<url><loc>${SITE.url}/${path(lang, r.key)}</loc>${alts}</url>`;
  }));
  await writeFile(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
  await writeFile(join(OUT, 'robots.txt'), SITE.preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
  await writeFile(join(OUT, '.nojekyll'), '');
  console.log(`✓ ${count} páginas generadas en ${OUT}/ (base ${SITE.base}, preview ${SITE.preview})`);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain' };

function serve(port = 4321) {
  createServer(async (req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/') { res.writeHead(302, { Location: SITE.base }); return res.end(); }
    if (!url.startsWith(SITE.base)) { res.writeHead(404); return res.end(); }
    let file = join(OUT, url.slice(SITE.base.length));
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(await readFile(join(OUT, '404.html')));
    }
  }).listen(port, () => console.log(`→ http://localhost:${port}${SITE.base}`));
}

await build();
if (process.argv.includes('--serve')) serve();
