// Interacciones y animaciones del sitio.
// Animaciones: GSAP + ScrollTrigger (movimiento ligado al scroll) y Lenis (scroll suave).
// Si esas librerías no cargan o el usuario pidió "reducir movimiento", el sitio funciona igual sin animaciones.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  /* ---------- Cabecera: se esconde al bajar, aparece al subir ---------- */
  const header = $('[data-header]');
  let lastY = 0;
  function onScroll(y) {
    if (!header) return;
    header.classList.toggle('is-solid', y > 40);
    if (!body.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > 300 && y > lastY);
    lastY = y;
  }
  addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  /* ---------- Menú móvil ---------- */
  const menuBtn = $('[data-menu]');
  const menu = $('[data-mobile-menu]');
  menuBtn?.addEventListener('click', () => {
    const open = !body.classList.contains('menu-open');
    body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    menuBtn.innerHTML = open
      ? '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
      : '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/></svg>';
    lenis?.[open ? 'stop' : 'start']();
  });

  /* ---------- Submenú "Áreas" y menú de llamada: cerrar al hacer clic fuera ---------- */
  $$('[data-sub]').forEach((b) => b.addEventListener('click', () => {
    const li = b.parentElement;
    li.classList.toggle('open');
    b.setAttribute('aria-expanded', li.classList.contains('open'));
  }));
  document.addEventListener('click', (e) => {
    $$('.call-menu[open]').forEach((d) => { if (!d.contains(e.target)) d.open = false; });
    $$('.has-sub.open').forEach((li) => { if (!li.contains(e.target)) li.classList.remove('open'); });
  });

  /* ---------- Antes / después ---------- */
  $$('[data-ba]').forEach((ba) => {
    const stage = $('.ba-stage', ba);
    const range = $('.ba-range', ba);
    const set = (v) => stage.style.setProperty('--pos', v + '%');
    range.addEventListener('input', () => set(range.value));
    ba._set = (v) => { range.value = v; set(v); };
  });

  /* ---------- Galería con filtros ---------- */
  const filters = $('[data-filters]');
  if (filters) {
    const items = $$('[data-gallery] .proj');
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      $$('[data-filter]', filters).forEach((b) => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', b === btn); });
      const f = btn.dataset.filter;
      const show = items.filter((it) => f === 'all' || it.dataset.cat === f);
      items.forEach((it) => it.classList.toggle('is-hidden', !show.includes(it)));
      if (window.gsap && !reduce) gsap.fromTo(show, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .6, stagger: .05, ease: 'power3.out' });
      window.ScrollTrigger?.refresh();
    });
  }

  /* ---------- Formulario de presupuesto ---------- */
  const form = $('[data-estimate]');
  if (form) setupEstimate(form);

  function setupEstimate(form) {
    const q = new URLSearchParams(location.search);
    if (q.get('service')) form.service.value = q.get('service');
    if (q.get('market')) form.market.value = q.get('market');
    const msg = form.dataset;
    const photos = form.photos;
    const dropText = $('[data-drop-text]', form);
    photos.addEventListener('change', () => {
      if (photos.files.length) dropText.textContent = [...photos.files].map((f) => f.name).join(', ');
    });

    const setErr = (name, text) => {
      const el = $(`[data-err="${name}"]`, form);
      if (el) el.textContent = text || '';
      form.elements[name]?.closest('.field')?.classList.toggle('has-err', !!text);
    };

    // Mercado según el código postal: Nevada empieza por 889–898, Florida por 320–349.
    function detectMarket(zip, city) {
      const p = parseInt(String(zip).slice(0, 3), 10);
      if (p >= 889 && p <= 898) return 'vegas';
      if (p >= 320 && p <= 349) return 'miami';
      if (/vegas|henderson|summerlin|nevada/i.test(city)) return 'vegas';
      return form.market.value || 'miami';
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.website.value) return; // campo trampa: solo los robots lo llenan
      const d = Object.fromEntries(new FormData(form));
      let ok = true;
      ['name', 'phone', 'email', 'city', 'zip', 'propertyType', 'service', 'description'].forEach((n) => {
        const empty = !String(d[n] || '').trim();
        setErr(n, empty ? msg.msgRequired : '');
        if (empty) ok = false;
      });
      if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { setErr('email', msg.msgEmail); ok = false; }
      if (d.phone && String(d.phone).replace(/\D/g, '').length < 10) { setErr('phone', msg.msgPhone); ok = false; }
      if (photos.files.length > 5) { setErr('photos', msg.msgFiles); ok = false; } else setErr('photos', '');
      if (!form.consent.checked) { setErr('consent', msg.msgRequired); ok = false; } else setErr('consent', '');
      if (!ok) { $('.has-err, .err:not(:empty)', form)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

      const done = $('[data-estimate-done]');
      const l = done.dataset;
      const market = detectMarket(d.zip, d.city);
      const when = new Date().toLocaleString(document.documentElement.lang === 'es' ? 'es-US' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' });
      const serviceLabel = form.service.selectedOptions[0]?.textContent || d.service;
      const lines = [
        `*${l.h}* — JD Service and Fixing Corp.`,
        `${l.lMarket}: ${l[market]}`,
        `${l.lReceived}: ${when}`,
        '',
        `${l.lName}: ${d.name}`,
        `${l.lPhone}: ${d.phone}`,
        `${l.lEmail}: ${d.email}`,
        `${l.lCity}: ${d.city} ${d.zip}`,
        `${l.lProperty}: ${d.propertyType}`,
        `${l.lService}: ${serviceLabel}`,
        d.budget ? `${l.lBudget}: ${d.budget}` : '',
        d.start ? `${l.lStart}: ${d.start}` : '',
        '',
        `${l.lDesc}: ${d.description}`,
      ].filter((x, i, a) => x !== '' || a[i - 1] !== '');
      $('[data-done-market]', done).textContent = l[market];
      $('[data-done-date]', done).textContent = when;
      $('[data-done-wa]', done).href = `https://wa.me/${l.wa}?text=${encodeURIComponent(lines.join('\n'))}`;
      form.hidden = true;
      done.hidden = false;
      done.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------- Animaciones ---------- */
  let lenis = null;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // Enlaces a secciones de la misma página (#...)
    $$('a[href*="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    }));
    if (location.hash) {
      const t = document.getElementById(location.hash.slice(1));
      if (t) addEventListener('load', () => lenis.scrollTo(t, { offset: -80, immediate: true }));
    }
  }

  // Parte los títulos en palabras para que suban una por una.
  $$('[data-split]').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w"><span>${w}</span></span>`).join(' ');
    gsap.from($$('.w > span', el), {
      yPercent: 110, duration: 1, ease: 'power4.out', stagger: .06,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  $$('[data-reveal]').forEach((el) => gsap.from(el, {
    y: 40, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 90%' },
  }));

  $$('[data-stagger]').forEach((el) => gsap.from(el.children, {
    y: 50, opacity: 0, duration: .9, ease: 'power3.out', stagger: .09,
    scrollTrigger: { trigger: el, start: 'top 85%' },
  }));

  // Hero de la home: entrada del texto y foto que se aleja al hacer scroll.
  const hero = $('[data-hero]');
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero-title .line > span', { yPercent: 115, duration: 1.3, stagger: .12 }, .1)
      .from('.hero-eyebrow, .hero-sub, .hero-text, .hero-ctas', { y: 30, opacity: 0, duration: 1, stagger: .08 }, .5)
      .from('.hero-scroll', { opacity: 0, duration: 1 }, 1);
    gsap.fromTo('.hero-img', { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'power2.out' });
    gsap.to('.hero-media', { yPercent: 22, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-in', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: '35% top', end: 'bottom top', scrub: true } });
  }

  // Cabeceras de páginas internas: la foto se mueve más lento que el texto.
  $$('[data-page-hero]').forEach((ph) => gsap.to($('.ph-img', ph), {
    yPercent: 18, ease: 'none', scrollTrigger: { trigger: ph, start: 'top top', end: 'bottom top', scrub: true },
  }));

  // Fotos con efecto parallax dentro de su marco.
  $$('[data-parallax-wrap] img').forEach((im) => gsap.fromTo(im, { yPercent: -12 }, {
    yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
  }));

  // Cinta de texto: se mueve sola y acelera / cambia de sentido con el scroll.
  const mq = $('[data-marquee]');
  if (mq) {
    const loop = gsap.to(mq, { xPercent: -33.333, duration: 28, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity() / 300;
        gsap.to(loop, { timeScale: (self.direction === 1 ? 1 : -1) * Math.min(4, 1 + Math.abs(v)), duration: .3, overwrite: true });
      },
    });
  }

  // Servicios: en escritorio la sección se fija y las tarjetas avanzan de lado con el scroll.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    $$('[data-hscroll]').forEach((sec) => {
      const track = $('[data-hs-track]', sec);
      const bar = $('[data-hs-bar]', sec);
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: sec, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        },
      });
    });
  });

  // Línea del proceso que se llena al bajar.
  $$('[data-steps]').forEach((st) => gsap.to($('[data-steps-fill]', st), {
    scaleY: 1, ease: 'none', scrollTrigger: { trigger: st, start: 'top 70%', end: 'bottom 60%', scrub: true },
  }));

  // Antes/después: el control se mueve solo una vez para mostrar que se puede arrastrar.
  $$('[data-ba]').forEach((ba) => {
    const o = { v: 50 };
    gsap.timeline({ scrollTrigger: { trigger: ba, start: 'top 70%' } })
      .to(o, { v: 22, duration: .9, ease: 'power2.inOut', onUpdate: () => ba._set(o.v) })
      .to(o, { v: 70, duration: 1.1, ease: 'power2.inOut', onUpdate: () => ba._set(o.v) })
      .to(o, { v: 50, duration: .8, ease: 'power2.inOut', onUpdate: () => ba._set(o.v) });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
