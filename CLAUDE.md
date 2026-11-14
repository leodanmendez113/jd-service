# JD Service and Fixing Corp. — Sitio web

Sitio corporativo bilingüe (inglés principal, español en `/es/`) para una empresa de remodelación
con dos mercados: **Miami, FL** y **Las Vegas, NV**. Especificación completa del cliente: `docs/ESPECIFICACION.md`.
Mapa de carpetas: `docs/MAPA.md` (leer antes de explorar).

## Estado actual (v1 — vista previa)
- **Sitio principal: https://jdfixing.com** (y www), en el VPS de Soleil, con HTTPS.
  Dirección alterna que sigue funcionando: https://jd.66-179-137-11.sslip.io.
  Se publica con `npm run deploy` (ver "Servidor" abajo). **No** se publica solo al hacer push.
- Copia de respaldo en GitHub Pages: https://leodanmendez113.github.io/jd-service/ (se publica sola con cada push a `main`).
- Modo **preview** activo: barra amarilla arriba, etiquetas "Sample" en fotos/testimonios y `noindex` (Google no indexa).

## Servidor (VPS de Soleil — 66.179.137.11, Ubuntu 24.04, nginx + certbot)
- **El servidor es compartido con learnwithsoleil.com (otro cliente). Nunca tocar nada de Soleil**:
  ni `/etc/nginx/sites-available/soleil`, ni su certificado, ni su app (puerto 3000).
- JD vive aparte: archivos en `/var/www/jd-service`, config nginx en `/etc/nginx/sites-available/zz-jd-service`
  (el "zz" hace que Soleil siga siendo el sitio por defecto para visitas por IP).
- Subida: usuario `jddeploy` (sin sudo, solo escribe en su carpeta) con la clave `~/.ssh/jd-service-deploy-ed25519`.
- Tareas de administrador (nginx, certbot): usuario `soleildeploy` con `~/.ssh/soleil-vps-deploy-ed25519`
  (esa clave se llama "temporary"; si deja de funcionar, la publicación sigue andando con jddeploy).
- Certificado de Let's Encrypt (nombre `jd.66-179-137-11.sslip.io`) cubre sslip.io, `jdfixing.com` y `www.jdfixing.com`;
  se renueva solo (certbot.timer). Copia de la config nginx: `docs/servidor/zz-jd-service.conf`.
- Cualquier cambio en nginx: `sudo nginx -t` antes de `sudo systemctl reload nginx`, y comprobar
  learnwithsoleil.com antes y después.
- **Deshacer todo:** `sudo rm /etc/nginx/sites-enabled/zz-jd-service && sudo nginx -t && sudo systemctl reload nginx`.

## Cómo se trabaja
- `npm run dev` → construye y sirve en http://localhost:4321/jd-service/
- `npm run build` → genera `dist/` (no se sube a git; lo genera GitHub Actions).
- `npm run deploy` → construye para la raíz del dominio y sube al VPS (`scripts/deploy.sh`; solo sube lo que cambió).
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
- 2026-11-14: **un solo teléfono** para todo el sitio, llamadas y WhatsApp: 725-235-8655 (`SITE.phone` y
  `SITE.whatsapp` en `src/config.js`). Ya no hay número separado por ciudad; el de Miami (305) se quitó.
- Fotos provisionales de Unsplash (enlazadas, no descargadas). Logo provisional en SVG (`logoMark` en `src/icons.js`).

## Dominio jdfixing.com (conectado 2026-11-14)
- Comprado en **Hostinger**; DNS en Hostinger (nameservers `*.dns-parking.com`): **A** `@` → `66.179.137.11`,
  **CNAME** `www` → `jdfixing.com`. Sin AAAA (el VPS no tiene IPv6). No tocar MX/TXT (serán del correo).
- `scripts/deploy.sh` publica con `SITE_URL=https://jdfixing.com` (canonical, sitemap y hreflang usan ese dominio).
- Falta: `PREVIEW=false` en `deploy.sh` cuando haya fotos y testimonios reales; poner `SITE.email`;
  conectar Google Analytics / Search Console / Business Profile.

## Pendientes (del cliente)
- Correo corporativo (info@, estimates@, projects@) en jdfixing.com.
- Logo original en buena calidad para redibujarlo (y las versiones horizontal/vertical/redes).
- Fotos y videos reales de proyectos, y pares reales de antes/después.
- Testimonios reales (los actuales son de muestra).
- Validar licencias (General Contractor, eléctrica) para Florida y Nevada.
- Revisión legal de Privacy Policy y Terms.

## Fase 2 (no empezada)
Panel admin privado (leads, servicios, fotos, proyectos, textos, promociones, testimonios, contactos),
base de datos, envío del formulario por correo con notificación, protección anti-spam en servidor, backups.
