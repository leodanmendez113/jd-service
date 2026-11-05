// Contenido de cada página. Cada función recibe L (textos del idioma) y devuelve el HTML del <main>.
import { SITE, img } from './config.js';
import { SERVICES, PROJECTS, BEFORE_AFTER, GALLERY_CATS } from './data.js';
import { PRIVACY, TERMS, UPDATED } from './i18n/legal.js';
import { icon } from './icons.js';
import { href, waLink, esc } from './layout.js';
import * as S from './sections.js';

const contactEmail = (L) => SITE.email ?? `${SITE.phones.miami.display} (Miami) / ${SITE.phones.vegas.display} (Las Vegas)`;

export const home = (L) =>
  [S.homeHero(L), S.marquee(L), S.intro(L), S.servicesScroll(L), S.featured(L), S.beforeAfter(L), S.why(L), S.process(L), S.areas(L), S.testimonials(L), S.ctaBand(L)].join('\n');

export function about(L) {
  const a = L.about;
  return `${S.pageHero(a.kicker, a.title, '', 'work')}
<section class="section">
  <div class="wrap about-grid">
    <div class="about-img" data-reveal data-parallax-wrap><img src="${img('interior1', 1000)}" alt="" loading="lazy"></div>
    <div>
      <p class="lead strong" data-reveal>${a.lead}</p>
      ${a.body.map((p) => `<p data-reveal>${p}</p>`).join('')}
      <h2 class="h3 mt" data-reveal>${a.valuesTitle}</h2>
      <div class="values" data-stagger>
        ${a.values.map(([t, d]) => `<div class="value"><span>${icon('check', 'i i-sm')}</span><div><strong>${t}</strong><p>${d}</p></div></div>`).join('')}
      </div>
    </div>
  </div>
</section>
${S.why(L)}
${S.areas(L)}
${S.ctaBand(L)}`;
}

export function services(L) {
  const s = L.services;
  return `${S.pageHero(s.kicker, s.title, s.pageIntro, 'kitchen2')}
<section class="section svc-list">
  <div class="wrap">
    ${SERVICES.map((sv, i) => {
      const it = s.items[sv.id];
      return `<article class="svc-row${i % 2 ? ' rev' : ''}" id="${sv.id}">
      <div class="svc-row-img" data-parallax-wrap><img src="${img(sv.img, 1200)}" alt="${esc(it.name)}" loading="lazy"></div>
      <div class="svc-row-body">
        <span class="svc-num" data-reveal>0${i + 1}</span>
        <h2 class="h2" data-split>${it.name}</h2>
        <p class="lead" data-reveal>${it.short}</p>
        <ul class="checks" data-stagger>${it.bullets.map((b) => `<li>${icon('check', 'i i-sm')} ${b}</li>`).join('')}</ul>
        <a class="btn btn-dark" href="${href(L.lang, 'estimate')}?service=${sv.id}" data-reveal>${L.nav.estimate} ${icon('arrow')}</a>
      </div>
    </article>`;
    }).join('')}
    <p class="note" data-reveal>${icon('shield', 'i i-sm')} ${s.note}</p>
  </div>
</section>
${S.process(L)}
${S.ctaBand(L)}`;
}

export function projects(L) {
  const p = L.projectsPage;
  return `${S.pageHero(p.kicker, p.title, p.sub, 'outdoor1')}
<section class="section">
  <div class="wrap">
    <div class="filters" role="toolbar" data-filters>
      <button type="button" class="chip is-on" data-filter="all" aria-pressed="true">${L.common.all}</button>
      ${GALLERY_CATS.map((c) => `<button type="button" class="chip" data-filter="${c}" aria-pressed="false">${L.cats[c]}</button>`).join('')}
    </div>
    <div class="gallery" data-gallery>
      ${PROJECTS.map((pr) => S.projectCard(L, pr, 900)).join('')}
    </div>
  </div>
</section>
${S.ctaBand(L)}`;
}

export function beforeAfterPage(L) {
  const b = L.baPage;
  return `${S.pageHero(b.kicker, b.title, b.sub, 'before2')}
<section class="section">
  <div class="wrap ba-list">
    ${BEFORE_AFTER.map((item) => `<div data-reveal>${S.baSlider(L, item)}</div>`).join('')}
  </div>
</section>
${S.ctaBand(L)}`;
}

export function market(L, m) {
  const t = L.markets[m];
  const ph = SITE.phones[m];
  const otherM = m === 'miami' ? 'vegas' : 'miami';
  const projects = PROJECTS.filter((p) => p.market === m).slice(0, 4);
  const ba = BEFORE_AFTER.find((b) => b.market === m) ?? BEFORE_AFTER[0];
  // A qué servicio enlaza cada palabra clave de t.services (mismo orden en ambos mercados).
  const svcIds = ['kitchen', 'bathroom', 'flooring', 'outdoor', 'general', 'lighting'];
  return `${S.pageHero(t.kicker, t.title, t.lead, m)}
<section class="section">
  <div class="wrap market-grid">
    <div>
      ${t.body.map((p) => `<p class="lead-sm" data-reveal>${p}</p>`).join('')}
      <h2 class="h3 mt" data-reveal>${t.servicesTitle}</h2>
      <ul class="kw-list" data-stagger>
        ${t.services.map((k, i) => `<li><a href="${href(L.lang, 'services', '#' + svcIds[i])}">${icon('check', 'i i-sm')} ${k}</a></li>`).join('')}
      </ul>
    </div>
    <aside class="contact-card" data-reveal>
      <h2 class="h3">${t.officeTitle}</h2>
      <a class="cc-row" href="tel:${ph.tel}">${icon('phone')}<span><small>${L.common.phone}</small>${ph.display}</span></a>
      ${m === 'miami' ? `<p class="cc-row">${icon('pin')}<span><small>${L.common.address}</small>${SITE.address.street}<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}</span></p>` : `<p class="cc-row">${icon('pin')}<span><small>${L.nav.areas}</small>${L.common.servingVegas}</span></p>`}
      <a class="btn btn-gold" href="${href(L.lang, 'estimate')}?market=${m}">${L.nav.estimate}</a>
      <a class="btn btn-outline-dark" href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} WhatsApp</a>
    </aside>
  </div>
</section>
<section class="section featured tight">
  <div class="wrap">
    <div class="gallery" data-stagger>${projects.map((p) => S.projectCard(L, p)).join('')}</div>
  </div>
</section>
<section class="section ba-sec">
  <div class="wrap"><div data-reveal>${S.baSlider(L, ba)}</div></div>
</section>
<section class="section other-market">
  <div class="wrap">
    <a class="om-link" href="${href(L.lang, otherM)}" data-reveal><small>${L.markets.otherMarket}</small><span>${L.common[otherM]}</span>${icon('arrowUpRight')}</a>
  </div>
</section>
${S.ctaBand(L, m)}`;
}

export function estimate(L) {
  const e = L.estimate;
  const f = e.fields;
  const field = (name, label, input, full = false) => `<div class="field${full ? ' full' : ''}"><label for="f-${name}">${label}</label>${input}<small class="err" data-err="${name}"></small></div>`;
  const opts = (arr) => `<option value="">${e.select}</option>` + arr.map((o) => `<option>${o}</option>`).join('');
  const svcOpts = `<option value="">${e.select}</option>` + SERVICES.map((s) => `<option value="${s.id}">${L.services.items[s.id].name}</option>`).join('') + `<option value="other">${e.otherService}</option>`;
  return `${S.pageHero(e.kicker, e.title, e.sub, 'bath2')}
<section class="section">
  <div class="wrap est-grid">
    <form class="est-form" data-estimate novalidate
      data-msg-required="${esc(e.required)}" data-msg-email="${esc(e.invalidEmail)}" data-msg-phone="${esc(e.invalidPhone)}" data-msg-files="${esc(e.tooMany)}">
      <div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="form-grid">
        ${field('name', f.name, '<input id="f-name" name="name" autocomplete="name" required>')}
        ${field('phone', f.phone, '<input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>')}
        ${field('email', f.email, '<input id="f-email" name="email" type="email" autocomplete="email" required>')}
        ${field('city', f.city, '<input id="f-city" name="city" autocomplete="address-level2" required>')}
        ${field('zip', f.zip, '<input id="f-zip" name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" required>')}
        ${field('propertyType', f.propertyType, `<select id="f-propertyType" name="propertyType" required>${opts(e.property)}</select>`)}
        ${field('service', f.service, `<select id="f-service" name="service" required>${svcOpts}</select>`)}
        ${field('budget', f.budget, `<select id="f-budget" name="budget">${opts(e.budgets)}</select>`)}
        ${field('start', f.start, '<input id="f-start" name="start" type="date">')}
        ${field('description', f.description, `<textarea id="f-description" name="description" rows="5" placeholder="${esc(e.descHint)}" required></textarea>`, true)}
        ${field('photos', f.photos, `<label class="drop" for="f-photos">${icon('upload')}<span data-drop-text>${f.photosHint}</span></label><input id="f-photos" name="photos" type="file" accept="image/*" multiple class="sr-only">`, true)}
      </div>
      <label class="consent"><input type="checkbox" name="consent" required> <span>${e.consent.replace(L.meta.privacy[0].split(' |')[0], `<a href="${href(L.lang, 'privacy')}">${L.meta.privacy[0].split(' |')[0]}</a>`)}</span></label>
      <small class="err" data-err="consent"></small>
      <input type="hidden" name="market">
      <button class="btn btn-gold btn-lg" type="submit">${e.submit} ${icon('arrow')}</button>
    </form>
    <div class="est-done" data-estimate-done hidden
      data-h="${esc(e.msgHeader)}" data-l-market="${esc(e.marketDetected)}" data-l-received="${esc(e.received)}"
      data-l-name="${esc(f.name)}" data-l-phone="${esc(f.phone)}" data-l-email="${esc(f.email)}" data-l-city="${esc(f.city)}" data-l-zip="${esc(f.zip)}"
      data-l-property="${esc(f.propertyType)}" data-l-service="${esc(f.service)}" data-l-budget="${esc(f.budget)}" data-l-start="${esc(f.start)}" data-l-desc="${esc(f.description)}"
      data-miami="${esc(L.common.miami)}" data-vegas="${esc(L.common.vegas)}" data-wa="${SITE.whatsapp}">
      <span class="done-icon">${icon('check')}</span>
      <h2 class="h3">${e.successTitle}</h2>
      <p>${e.successText}</p>
      <dl class="done-meta"><div><dt>${e.marketDetected}</dt><dd data-done-market></dd></div><div><dt>${e.received}</dt><dd data-done-date></dd></div></dl>
      <a class="btn btn-gold btn-lg" data-done-wa href="#" target="_blank" rel="noopener">${icon('chat')} ${e.sendWhatsApp}</a>
    </div>
    <aside class="contact-card sticky">
      <p>${e.side}</p>
      <a class="cc-row" href="tel:${SITE.phones.miami.tel}">${icon('phone')}<span><small>${L.common.miami}</small>${SITE.phones.miami.display}</span></a>
      <a class="cc-row" href="tel:${SITE.phones.vegas.tel}">${icon('phone')}<span><small>${L.common.vegas}</small>${SITE.phones.vegas.display}</span></a>
      <a class="btn btn-outline-dark" href="${waLink()}" target="_blank" rel="noopener">${icon('chat')} WhatsApp</a>
    </aside>
  </div>
</section>`;
}

export function contact(L) {
  const c = L.contact;
  const addr = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}`;
  return `${S.pageHero(c.kicker, c.title, c.sub, 'light2')}
<section class="section">
  <div class="wrap contact-grid">
    <div class="contact-card" data-reveal>
      <h2 class="h3">${c.miamiTitle}</h2>
      <a class="cc-row" href="tel:${SITE.phones.miami.tel}">${icon('phone')}<span><small>${L.common.phone}</small>${SITE.phones.miami.display}</span></a>
      <p class="cc-row">${icon('pin')}<span><small>${L.common.address}</small>${addr}</span></p>
      <a class="btn btn-dark" href="tel:${SITE.phones.miami.tel}">${L.common.callMiami}</a>
    </div>
    <div class="contact-card" data-reveal>
      <h2 class="h3">${c.vegasTitle}</h2>
      <a class="cc-row" href="tel:${SITE.phones.vegas.tel}">${icon('phone')}<span><small>${L.common.phone}</small>${SITE.phones.vegas.display}</span></a>
      <p class="cc-row">${icon('pin')}<span><small>${L.nav.areas}</small>${c.vegasAddress}</span></p>
      <a class="btn btn-dark" href="tel:${SITE.phones.vegas.tel}">${L.common.callVegas}</a>
    </div>
    <div class="contact-card gold" data-reveal>
      <h2 class="h3">WhatsApp · ${L.common.email}</h2>
      <a class="cc-row" href="${waLink()}" target="_blank" rel="noopener">${icon('chat')}<span><small>WhatsApp</small>${SITE.phones.miami.display}</span></a>
      <p class="cc-row">${icon('mail')}<span><small>${L.common.email}</small>${SITE.email ?? L.common.emailSoon}</span></p>
      <a class="btn btn-dark" href="${href(L.lang, 'estimate')}">${L.nav.estimate}</a>
    </div>
  </div>
  <div class="wrap">
    <div class="map" data-reveal>
      <iframe title="${esc(c.mapTitle)}" src="https://maps.google.com/maps?q=${encodeURIComponent(addr)}&z=14&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>`;
}

function legalPage(L, kind, data) {
  const title = L.meta[kind][0].split(' |')[0];
  const email = contactEmail(L);
  return `${S.pageHero('Legal', title, `${L.legal.updated}: ${UPDATED}`, 'interior3')}
<section class="section">
  <div class="wrap legal">
    ${data[L.lang].map(([h, p]) => `<h2>${h}</h2><p>${p.replace('{email}', email)}</p>`).join('')}
  </div>
</section>`;
}

export const privacy = (L) => legalPage(L, 'privacy', PRIVACY);
export const terms = (L) => legalPage(L, 'terms', TERMS);

export function notFound(L) {
  const n = L.notFound;
  return `<section class="section nf">
  <div class="wrap center">
    <p class="nf-code">404</p>
    <h1 class="h2">${n.title}</h1>
    <p class="lead">${n.text}</p>
    <p class="nf-links">${['home', 'services', 'projects', 'contact'].map((k) => `<a class="chip" href="${href(L.lang, k)}">${L.nav[k]}</a>`).join('')}</p>
  </div>
</section>`;
}
