# JD Service and Fixing Corp. — Sitio web

Sitio corporativo bilingüe (inglés principal, español en `/es/`) para una empresa de remodelación
con dos mercados: **Miami, FL** y **Las Vegas, NV**. Especificación completa del cliente: `docs/ESPECIFICACION.md`.
Mapa de carpetas: `docs/MAPA.md` (leer antes de explorar).

## Estado actual (v1 — vista previa)
- Publicado en GitHub Pages: https://leodanmendez113.github.io/jd-service/ (repo `leodanmendez113/jd-service`).
- Cada `git push` a `main` vuelve a publicar solo (GitHub Actions, `.github/workflows/deploy.yml`).
- Hosting definitivo: **pendiente**, Leo lo decide después.
- Modo **preview** activo: barra amarilla arriba, etiquetas "Sample" en fotos/testimonios y `noindex` (Google no indexa).

## Cómo se trabaja
- `npm run dev` → construye y sirve en http://localhost:4321/jd-service/
- `npm run build` → genera `dist/` (no se sube a git; lo genera GitHub Actions).
- Sin dependencias: solo Node. El generador es `build.mjs`; las páginas se arman con funciones JS en `src/`.
- Animaciones: GSAP 3.12.5 + ScrollTrigger (cdnjs) y Lenis 1.1.13 (unpkg), cargados por CDN en `src/layout.js`.
  Si no cargan o el usuario tiene "reducir movimiento", el sitio funciona igual sin animaciones.

## Convenciones
- **Todo texto visible va en `src/i18n/en.js` y `src/i18n/es.js`** con las mismas claves. Nada de texto suelto en plantillas.
- Textos legales: `src/i18n/legal.js` (plantilla, debe revisarla un abogado).
- Teléfonos, dirección, WhatsApp, email, URL y fotos: `src/config.js`.
- Servicios, proyectos de la galería y pares antes/después: `src/data.js`.
- Animaciones por atributos: `data-reveal`, `data-split`, `data-stagger`, `data-parallax-wrap` (ver `assets/js/main.js`).
- CSS en 3 archivos: `base.css` (global), `sections.css` (home), `pages.css` (páginas internas).
- No mostrar dirección física de Las Vegas hasta que el cliente la confirme.
- No inventar datos del negocio (horarios, años de experiencia, licencias, cifras). Si falta, se deja fuera y se anota en Pendientes.

## Decisiones tomadas
- 2026-11-05: v1 = sitio estático completo (11 páginas × 2 idiomas). Panel admin + base de datos quedan para **fase 2**,
  cuando haya dominio, correo y hosting definitivo.
- El formulario de presupuesto (v1) valida los datos, detecta el mercado por ZIP (NV 889–898, FL 320–349) y abre
  **WhatsApp** con la solicitud ya escrita (las fotos se adjuntan en WhatsApp). En fase 2 se reemplaza por envío a
  servidor + correo + base de datos.
- Fotos provisionales de Unsplash (enlazadas, no descargadas). Logo provisional en SVG (`logoMark` en `src/icons.js`).

## Al pasar al dominio definitivo
1. `BASE=/ SITE_URL=https://dominio.com PREVIEW=false node build.mjs` (o cambiar los valores en `src/config.js`).
2. Reemplazar fotos y testimonios de muestra por reales; quitar `preview`.
3. Poner `SITE.email`, conectar Google Analytics / Search Console / Business Profile.

## Pendientes (del cliente)
- Dominio y correo corporativo (info@, estimates@, projects@).
- Logo original en buena calidad para redibujarlo (y las versiones horizontal/vertical/redes).
- Fotos y videos reales de proyectos, y pares reales de antes/después.
- Testimonios reales (los actuales son de muestra).
- Confirmar qué número usa WhatsApp (ahora: el de Miami).
- Validar licencias (General Contractor, eléctrica) para Florida y Nevada.
- Revisión legal de Privacy Policy y Terms.

## Fase 2 (no empezada)
Panel admin privado (leads, servicios, fotos, proyectos, textos, promociones, testimonios, contactos),
base de datos, envío del formulario por correo con notificación, protección anti-spam en servidor, backups.
