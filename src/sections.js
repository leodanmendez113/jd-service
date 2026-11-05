// Secciones reutilizables (home y páginas internas). Los atributos data-* activan las animaciones de main.js.
import { SITE, img } from './config.js';
import { SERVICES, PROJECTS, BEFORE_AFTER } from './data.js';
import { icon } from './icons.js';
import { href, callButton, esc } from './layout.js';

// Foto responsive: el navegador elige el tamaño según la pantalla. full = ocupa todo el ancho.
const pic = (key, alt, w = 1200, cls = '', eager = false, full = false) =>
  `<img class="${cls}" src="${img(key, w)}" srcset="${img(key, Math.round(w / 2))} ${Math.round(w / 2)}w, ${img(key, w)} ${w}w" sizes="${full ? '100vw' : '(max-width: 768px) 100vw, 50vw'}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

const head = (kicker, title, sub = '', cls = '') => `<div class="sec-head ${cls}">
    <p class="kicker" data-reveal>${kicker}</p>
    <h2 class="h2" data-split>${title}</h2>
    ${sub ? `<p class="lead" data-reveal>${sub}</p>` : ''}
  </div>`;

export function homeHero(L) {
  const h = L.hero;
  return `<section class="hero" data-hero>
  <div class="hero-media">${pic('hero', L.services.items.kitchen.name, 2000, 'hero-img', true, true)}</div>
  <div class="hero-shade"></div>
  <div class="wrap hero-in">
    <p class="kicker kicker-light hero-eyebrow">${icon('pin', 'i i-sm')} ${h.eyebrow}</p>
    <h1 class="hero-title">
      <span class="line"><span>${h.line1}</span></span>
      <span class="line gold"><span>${h.line2}</span></span>
    </h1>
    <p class="hero-sub">${h.sub}</p>
    <p class="hero-text">${h.text}</p>
    <div class="hero-ctas">
      <a class="btn btn-gold btn-lg" href="${href(L.lang, 'estimate')}">${L.nav.estimate} ${icon('arrow')}</a>
      ${callButton(L, null, 'btn btn-glass btn-lg')}
    </div>
  </div>
  <div class="hero-scroll" aria-hidden="true"><span>${h.scroll}</span><i></i></div>
</section>`;
}

export function marquee(L) {
  const items = L.marquee.map((m) => `<span>${m}</span><b>✦</b>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track" data-marquee>${items}${items}${items}</div></div>`;
}

export function intro(L) {
  const t = L.intro;
  return `<section class="section intro">
  <div class="wrap intro-grid">
    <div>
      <p class="kicker" data-reveal>${t.kicker}</p>
      <h2 class="h2" data-split>${t.title}</h2>
    </div>
    <div>
      <p class="lead" data-reveal>${t.text}</p>
      <dl class="stats" data-stagger>
        ${t.stats.map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('')}
      </dl>
      <a class="link-arrow" href="${href(L.lang, 'about')}" data-reveal>${L.common.learnMore} ${icon('arrow')}</a>
    </div>
  </div>
</section>`;
}

// Servicios en carrusel horizontal que avanza con el scroll (en móvil se desliza con el dedo).
export function servicesScroll(L) {
  const s = L.services;
  return `<section class="section services-h dark" data-hscroll>
  <div class="wrap hs-head">
    ${head(s.kicker, s.title, s.sub)}
    <a class="btn btn-outline-light hide-sm" href="${href(L.lang, 'services')}">${L.common.allServices} ${icon('arrow')}</a>
  </div>
  <div class="hs-viewport">
    <div class="hs-track" data-hs-track>
      ${SERVICES.map((sv, i) => {
        const it = s.items[sv.id];
        return `<a class="svc-card" href="${href(L.lang, 'services', '#' + sv.id)}">
        <div class="svc-img">${pic(sv.img, it.name, 900)}</div>
        <div class="svc-body">
          <span class="svc-num">0${i + 1}</span>
          <span class="svc-icon">${icon(sv.icon)}</span>
          <h3>${it.name}</h3>
          <p>${it.short}</p>
          <span class="svc-more">${L.common.learnMore} ${icon('arrowUpRight', 'i i-sm')}</span>
        </div>
      </a>`;
      }).join('')}
    </div>
  </div>
  <div class="wrap hs-progress"><span data-hs-bar></span></div>
</section>`;
}

export function projectCard(L, p, w = 900) {
  const sample = SITE.preview ? `<span class="tag-sample">${L.common.sample}</span>` : '';
  return `<figure class="proj" data-cat="${p.cat}">
    <div class="proj-img" data-parallax-wrap>${pic(p.img, p[L.lang], w, '', false)}</div>
    <figcaption><span class="proj-cat">${L.cats[p.cat]} · ${L.common[p.market]}</span><strong>${p[L.lang]}</strong></figcaption>
    ${sample}
  </figure>`;
}

export function featured(L) {
  const picks = [PROJECTS[0], PROJECTS[2], PROJECTS[1], PROJECTS[4], PROJECTS[6]];
  return `<section class="section featured">
  <div class="wrap">
    <div class="split-head">
      ${head(L.featured.kicker, L.featured.title)}
      <a class="link-arrow hide-sm" href="${href(L.lang, 'projects')}">${L.common.viewAll} ${icon('arrow')}</a>
    </div>
    <div class="feat-grid" data-stagger>
      ${picks.map((p) => projectCard(L, p, 1100)).join('')}
    </div>
    <a class="btn btn-dark show-sm" href="${href(L.lang, 'projects')}">${L.common.viewAll} ${icon('arrow')}</a>
  </div>
</section>`;
}

export function baSlider(L, b) {
  return `<figure class="ba" data-ba>
    <div class="ba-stage">
      ${pic(b.after, `${L.common.after}: ${b[L.lang]}`, 1400, 'ba-after', false, true)}
      <div class="ba-before-wrap">${pic(b.before, `${L.common.before}: ${b[L.lang]}`, 1400, 'ba-before', false, true)}</div>
      <span class="ba-label ba-l">${L.common.before}</span>
      <span class="ba-label ba-r">${L.common.after}</span>
      <div class="ba-handle" aria-hidden="true"><span>${icon('chevron', 'i i-sm l')}${icon('chevron', 'i i-sm r')}</span></div>
      <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="${L.common.drag}">
      ${SITE.preview ? `<span class="tag-sample">${L.common.sample}</span>` : ''}
    </div>
    <figcaption><strong>${b[L.lang]}</strong> · ${L.common[b.market]}</figcaption>
  </figure>`;
}

export function beforeAfter(L) {
  return `<section class="section ba-sec">
  <div class="wrap">
    ${head(L.ba.kicker, L.ba.title, L.ba.sub, 'center')}
    <div data-reveal>${baSlider(L, BEFORE_AFTER[0])}</div>
    <p class="center mt"><a class="link-arrow" href="${href(L.lang, 'beforeAfter')}">${L.common.learnMore} ${icon('arrow')}</a></p>
  </div>
</section>`;
}

export function why(L) {
  return `<section class="section why dark">
  <div class="wrap">
    ${head(L.why.kicker, L.why.title)}
    <div class="why-grid" data-stagger>
      ${L.why.items.map(([ic, t, d]) => `<div class="why-item"><span class="why-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>`;
}

export function process(L) {
  return `<section class="section process">
  <div class="wrap process-grid">
    <div class="process-sticky">${head(L.process.kicker, L.process.title)}</div>
    <div class="steps" data-steps>
      <span class="steps-line"><i data-steps-fill></i></span>
      <ol>${L.process.steps.map(([t, d], i) => `<li data-reveal><span class="step-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
    </div>
  </div>
</section>`;
}

export function areas(L) {
  const card = (m, text) => `<a class="area" href="${href(L.lang, m)}" data-reveal>
      <div class="area-img" data-parallax-wrap>${pic(m, L.common[m], 1200)}</div>
      <div class="area-body">
        <h3>${L.common[m]}</h3>
        <p>${text}</p>
        <span class="area-phone">${icon('phone', 'i i-sm')} ${SITE.phones[m].display}</span>
        <span class="area-go">${icon('arrowUpRight')}</span>
      </div>
    </a>`;
  return `<section class="section areas">
  <div class="wrap">
    ${head(L.areas.kicker, L.areas.title)}
    <div class="areas-grid">${card('miami', L.areas.miamiText)}${card('vegas', L.areas.vegasText)}</div>
  </div>
</section>`;
}

export function testimonials(L) {
  return `<section class="section testi">
  <div class="wrap">
    ${head(L.testimonials.kicker, L.testimonials.title, '', 'center')}
    <div class="testi-grid" data-stagger>
      ${L.testimonials.items.map(([q, n, loc]) => `<blockquote class="quote">
        <div class="stars" aria-label="5/5">${icon('star', 'i i-sm').repeat(5)}</div>
        <p>“${q}”</p>
        <footer><strong>${n}</strong> · ${loc}${SITE.preview ? ` <span class="tag-sample static">${L.common.sample}</span>` : ''}</footer>
      </blockquote>`).join('')}
    </div>
  </div>
</section>`;
}

export function ctaBand(L, market = null) {
  return `<section class="cta-band">
  <div class="wrap cta-in" data-reveal>
    <div>
      <h2 class="h2">${L.cta.title}</h2>
      <p>${L.cta.text}</p>
    </div>
    <div class="cta-btns">
      <a class="btn btn-dark btn-lg" href="${href(L.lang, 'estimate')}">${L.nav.estimate} ${icon('arrow')}</a>
      ${callButton(L, market, 'btn btn-outline-dark btn-lg')}
    </div>
  </div>
</section>`;
}

// Cabecera de páginas internas, con foto de fondo que se mueve al hacer scroll.
export function pageHero(kicker, title, sub, imgKey) {
  return `<section class="page-hero dark" data-page-hero>
  <div class="ph-media">${pic(imgKey, '', 1800, 'ph-img', true, true)}</div>
  <div class="ph-shade"></div>
  <div class="wrap ph-in">
    <p class="kicker kicker-light" data-reveal>${kicker}</p>
    <h1 class="h1" data-split>${title}</h1>
    ${sub ? `<p class="lead" data-reveal>${sub}</p>` : ''}
  </div>
</section>`;
}
