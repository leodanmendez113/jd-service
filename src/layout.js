// Estructura común de todas las páginas: <head>, cabecera, menú móvil, pie y botones de contacto.
import { SITE, ROUTES, img } from './config.js';
import { SERVICES } from './data.js';
import { icon, logoMark } from './icons.js';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Ruta relativa a la base, p. ej. "es/services/".
export function path(lang, key) {
  const { slug } = ROUTES.find((r) => r.key === key);
  return (lang === 'es' ? 'es/' : '') + (slug ? slug + '/' : '');
}
export const href = (lang, key, hash = '') => SITE.base + path(lang, key) + hash;
export const asset = (p) => SITE.base + 'assets/' + p;
const other = (lang) => (lang === 'en' ? 'es' : 'en');

export function waLink(text = '') {
  return `https://wa.me/${SITE.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;
}

function jsonLd(lang, key) {
  const base = {
    '@type': 'HomeAndConstructionBusiness',
    name: SITE.name,
    image: img('hero', 1200),
    url: SITE.url + '/',
    priceRange: '$$',
    knowsLanguage: ['en', 'es'],
  };
  const miami = {
    ...base,
    '@id': SITE.url + '/miami-fl/#business',
    url: SITE.url + '/miami-fl/',
    telephone: SITE.phones.miami.tel,
    address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.region, postalCode: SITE.address.zip, addressCountry: SITE.address.country },
    areaServed: { '@type': 'City', name: 'Miami' },
  };
  // Las Vegas: sin dirección física hasta que el cliente la confirme.
  const vegas = {
    ...base,
    '@id': SITE.url + '/las-vegas-nv/#business',
    url: SITE.url + '/las-vegas-nv/',
    telephone: SITE.phones.vegas.tel,
    areaServed: { '@type': 'City', name: 'Las Vegas' },
  };
  const graph = key === 'miami' ? [miami] : key === 'vegas' ? [vegas] : key === 'home' ? [miami, vegas] : [];
  if (!graph.length) return '';
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

function head(L, key, routeKey) {
  const [title, desc] = L.meta[key];
  const p = routeKey ? path(L.lang, routeKey) : '';
  const alt = routeKey ? path(other(L.lang), routeKey) : '';
  return `<!doctype html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${SITE.preview ? '<meta name="robots" content="noindex, nofollow">' : ''}
${routeKey ? `<link rel="canonical" href="${SITE.url}/${p}">
<link rel="alternate" hreflang="${L.lang}" href="${SITE.url}/${p}">
<link rel="alternate" hreflang="${other(L.lang)}" href="${SITE.url}/${alt}">
<link rel="alternate" hreflang="x-default" href="${SITE.url}/${L.lang === 'en' ? p : alt}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${img('hero', 1200)}">
<meta property="og:locale" content="${L.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1f1f1f">
<link rel="icon" href="${asset('img/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('css/base.css')}">
<link rel="stylesheet" href="${asset('css/sections.css')}">
<link rel="stylesheet" href="${asset('css/pages.css')}">
${jsonLd(L.lang, key)}
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script defer src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script defer src="${asset('js/main.js')}"></script>
</head>`;
}

function header(L, routeKey) {
  const n = L.nav;
  const link = (k) => `<a href="${href(L.lang, k)}"${k === routeKey ? ' aria-current="page"' : ''}>${n[k]}</a>`;
  const langHref = routeKey ? href(other(L.lang), routeKey) : href(other(L.lang), 'home');
  return `<a class="skip" href="#main">${L.common.skip}</a>
${SITE.preview ? `<div class="preview-bar">${L.common.preview}</div>` : ''}
<header class="site-header" data-header>
  <div class="wrap header-in">
    <a class="brand" href="${href(L.lang, 'home')}" aria-label="${SITE.name}">${logoMark()}<span class="brand-text"><b>JD Service</b><small>and Fixing Corp.</small></span></a>
    <nav class="nav" aria-label="Main">
      <ul>
        <li>${link('services')}</li>
        <li>${link('projects')}</li>
        <li>${link('beforeAfter')}</li>
        <li class="has-sub">
          <button type="button" aria-expanded="false" data-sub>${n.areas}${icon('chevron', 'i i-sm')}</button>
          <ul class="sub">
            <li>${link('miami')}</li>
            <li>${link('vegas')}</li>
          </ul>
        </li>
        <li>${link('about')}</li>
        <li>${link('contact')}</li>
      </ul>
    </nav>
    <div class="header-actions">
      <a class="lang" href="${langHref}" hreflang="${other(L.lang)}" lang="${other(L.lang)}" aria-label="${L.switchLabel}" data-lang="${other(L.lang)}">${L.switchShort}</a>
      <a class="btn btn-gold btn-sm hide-sm" href="${href(L.lang, 'estimate')}">${n.estimateShort}</a>
      <button class="menu-btn" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="${n.menu}" data-menu>${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-mobile-menu aria-hidden="true">
  <nav class="mm-nav" aria-label="Mobile">
    ${['home', 'services', 'projects', 'beforeAfter', 'miami', 'vegas', 'about', 'contact'].map((k, i) => `<a href="${href(L.lang, k)}" style="--i:${i}">${n[k]}</a>`).join('')}
  </nav>
  <div class="mm-foot">
    <a class="btn btn-gold" href="${href(L.lang, 'estimate')}">${n.estimate}</a>
    <a class="mm-phone" href="tel:${SITE.phones.miami.tel}">${icon('phone')} <span>${L.common.miami}</span> ${SITE.phones.miami.display}</a>
    <a class="mm-phone" href="tel:${SITE.phones.vegas.tel}">${icon('phone')} <span>${L.common.vegas}</span> ${SITE.phones.vegas.display}</a>
    <a class="mm-lang" href="${langHref}" hreflang="${other(L.lang)}" data-lang="${other(L.lang)}">${L.switchLabel}</a>
  </div>
</div>`;
}

// Botón "Call Now" con los dos números (o uno solo si estamos en la página de un mercado).
export function callButton(L, market, cls = 'btn btn-ghost') {
  if (market) {
    const ph = SITE.phones[market];
    return `<a class="${cls}" href="tel:${ph.tel}">${icon('phone')} ${L.nav.call} · ${ph.display}</a>`;
  }
  return `<details class="call-menu">
    <summary class="${cls}">${icon('phone')} ${L.nav.call}</summary>
    <div class="call-pop">
      <a href="tel:${SITE.phones.miami.tel}"><small>${L.common.miami}</small>${SITE.phones.miami.display}</a>
      <a href="tel:${SITE.phones.vegas.tel}"><small>${L.common.vegas}</small>${SITE.phones.vegas.display}</a>
    </div>
  </details>`;
}

function footer(L) {
  const f = L.footer;
  const year = new Date().getFullYear();
  const contactLine = SITE.email ? `<a href="mailto:${SITE.email}">${icon('mail')} ${SITE.email}</a>` : '';
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="f-brand">
      <a class="brand" href="${href(L.lang, 'home')}">${logoMark()}<span class="brand-text"><b>JD Service</b><small>and Fixing Corp.</small></span></a>
      <p>${f.about}</p>
      <p class="f-langs">${icon('languages')} ${L.common.langs}</p>
    </div>
    <div>
      <h3>${f.company}</h3>
      <ul>${['about', 'projects', 'beforeAfter', 'miami', 'vegas', 'estimate', 'contact'].map((k) => `<li><a href="${href(L.lang, k)}">${L.nav[k]}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>${f.services}</h3>
      <ul>${SERVICES.map((s) => `<li><a href="${href(L.lang, 'services', '#' + s.id)}">${L.services.items[s.id].name}</a></li>`).join('')}</ul>
    </div>
    <div class="f-contact">
      <h3>${f.contact}</h3>
      <a href="tel:${SITE.phones.miami.tel}">${icon('phone')} <span><small>${L.common.miami}</small>${SITE.phones.miami.display}</span></a>
      <a href="tel:${SITE.phones.vegas.tel}">${icon('phone')} <span><small>${L.common.vegas}</small>${SITE.phones.vegas.display}</span></a>
      <a href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} <span>WhatsApp</span></a>
      <p>${icon('pin')} <span>${SITE.address.street}<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}</span></p>
      ${contactLine}
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${year} ${SITE.name} ${f.rights}</p>
    <p><a href="${href(L.lang, 'privacy')}">${L.meta.privacy[0].split(' |')[0]}</a> · <a href="${href(L.lang, 'terms')}">${L.meta.terms[0].split(' |')[0]}</a></p>
  </div>
</footer>
<div class="contact-bar" aria-label="Quick contact">
  <a href="tel:${SITE.phones.miami.tel}">${icon('phone')}<span>Miami</span></a>
  <a href="tel:${SITE.phones.vegas.tel}">${icon('phone')}<span>Las Vegas</span></a>
  <a href="${waLink()}" target="_blank" rel="noopener">${icon('chat')}<span>WhatsApp</span></a>
  <a class="cb-gold" href="${href(L.lang, 'estimate')}">${icon('clipboard')}<span>${L.nav.estimateBar}</span></a>
</div>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('chat')}</a>`;
}

// Arma la página completa. key = clave de textos meta; routeKey = página (null en 404).
export function page(L, key, routeKey, body, bodyClass = '') {
  return `${head(L, key, routeKey)}
<body class="${bodyClass}">
${header(L, routeKey)}
<main id="main">
${body}
</main>
${footer(L)}
</body>
</html>`;
}
