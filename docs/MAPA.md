# Mapa del proyecto

```
jd-service/
├── build.mjs                  Generador: arma dist/ (22 páginas, sitemap, robots, 404). --serve = servidor local
├── package.json               Scripts: npm run dev / npm run build (sin dependencias)
├── src/
│   ├── config.js              Datos de la empresa, rutas, idiomas, fotos (IDs de Unsplash), modo preview
│   ├── data.js                Servicios, proyectos de la galería, pares antes/después
│   ├── icons.js               Íconos SVG y logo provisional JD'S
│   ├── layout.js              <head> (SEO, hreflang, datos estructurados), cabecera, menú móvil, pie, barra de contacto
│   ├── sections.js            Secciones reutilizables (hero, servicios horizontales, galería, antes/después, etc.)
│   ├── pages.js               Contenido de cada página (home, about, services, projects, mercados, formulario, legales, 404)
│   └── i18n/
│       ├── en.js              Todos los textos en inglés
│       ├── es.js              Todos los textos en español (mismas claves)
│       └── legal.js           Privacy Policy y Terms en ambos idiomas
├── assets/
│   ├── css/base.css           Colores, tipografía, botones, cabecera, pie, móvil
│   ├── css/sections.css       Estilos de las secciones de la home
│   ├── css/pages.css          Estilos de páginas internas y formulario
│   ├── js/main.js             Menú, filtros, antes/después, formulario → WhatsApp, animaciones de scroll
│   └── img/favicon.svg
├── scripts/deploy.sh          npm run deploy: construye y sube el sitio al VPS de Soleil con rsync
├── .github/workflows/deploy.yml   Publica la copia de respaldo en GitHub Pages en cada push a main
├── .claude/launch.json        Servidor de vista previa para Claude
└── docs/
    ├── servidor/zz-jd-service.conf  Copia de la config de nginx del VPS (solo referencia)
    ├── ESPECIFICACION.md      Lo que pidió el cliente
    └── MAPA.md                Este archivo
```

## Rutas (iguales en ambos idiomas; español con prefijo /es/)
`/`, `/about/`, `/services/`, `/projects/`, `/before-after/`, `/miami-fl/`, `/las-vegas-nv/`,
`/request-an-estimate/`, `/contact/`, `/privacy-policy/`, `/terms-and-conditions/`.
