// Datos generales del sitio. Lo que cambie con el hosting/dominio definitivo vive aquí.

export const SITE = {
  // Ruta base donde vive el sitio. En GitHub Pages es "/jd-service/"; con dominio propio será "/".
  base: process.env.BASE ?? '/jd-service/',
  // URL pública (sin barra final). Se usa para SEO (canonical, sitemap, datos estructurados).
  url: process.env.SITE_URL ?? 'https://leodanmendez113.github.io/jd-service',
  // Modo vista previa: muestra la barra "Preview" y pide a Google no indexar.
  // Poner en false cuando el sitio esté en el dominio final con fotos y testimonios reales.
  preview: process.env.PREVIEW !== 'false',
  name: 'JD Service and Fixing Corp.',
  shortName: "JD'S Service & Fixing",
  email: null, // pendiente: info@[dominio]
  whatsapp: '13056137449', // pendiente de confirmar con el cliente qué número usa WhatsApp
  address: {
    street: '11610 SW 191st St',
    city: 'Miami',
    region: 'FL',
    zip: '33157',
    country: 'US',
  },
  phones: {
    miami: { display: '305-613-7449', tel: '+13056137449' },
    vegas: { display: '725-235-8655', tel: '+17252358655' },
  },
};

// Idiomas: el inglés vive en la raíz y el español en /es/.
export const LANGS = ['en', 'es'];

// Páginas del sitio: clave interna → ruta (igual en ambos idiomas).
export const ROUTES = [
  { key: 'home', slug: '' },
  { key: 'about', slug: 'about' },
  { key: 'services', slug: 'services' },
  { key: 'projects', slug: 'projects' },
  { key: 'beforeAfter', slug: 'before-after' },
  { key: 'miami', slug: 'miami-fl' },
  { key: 'vegas', slug: 'las-vegas-nv' },
  { key: 'estimate', slug: 'request-an-estimate' },
  { key: 'contact', slug: 'contact' },
  { key: 'privacy', slug: 'privacy-policy' },
  { key: 'terms', slug: 'terms-and-conditions' },
];

// Fotos provisionales de Unsplash (licencia gratuita). Reemplazar por fotos reales del cliente.
// Para usar una foto local en el futuro, poner la ruta empezando por "/assets/...".
export const IMG = {
  hero: '1682888813913-e13f18692019',
  kitchen1: '1639405069836-f82aa6dcb900',
  kitchen2: '1649083048597-d7b4f1e8a386',
  kitchen3: '1601760561441-16420502c7e0',
  bath1: '1584622650111-993a426fbf0a',
  bath2: '1763485956310-55f3c0e822d5',
  bath3: '1771681278369-e2a5480b8c29',
  bath4: '1629079447777-1e605162dc8d',
  floor1: '1706629503571-c165023a7792',
  floor2: '1656646523907-97b094c7e63a',
  floor3: '1656733911001-16912b79d2bf',
  light1: '1724582586529-62622e50c0b3',
  light2: '1649083048770-82e8ffd80431',
  light3: '1628745750131-e5cfc5e70ced',
  interior1: '1693985120993-e9b203ce7631',
  interior2: '1704040686510-b747ff423ebb',
  interior3: '1564078516393-cf04bd966897',
  outdoor1: '1762811054950-b74e0a055c80',
  outdoor2: '1763479142678-8e29f4edb538',
  outdoor3: '1783125127094-ea962d41ba42',
  pergola1: '1769503236428-7773271074cf',
  pergola2: '1789301213973-fcfe2886a9a6',
  pergola3: '1703718326638-2853d4f87ff7',
  before1: '1618832515490-e181c4794a45',
  before2: '1634586648651-f1fb9ec10d90',
  before3: '1517581177682-a085bb7ffb15',
  work: '1505798577917-a65157d3320a',
  miami: '1535498730771-e735b998cd64',
  vegas: '1780635765462-d8121de41bb2',
};

export function img(key, w = 1200) {
  const id = IMG[key];
  if (id.startsWith('/')) return SITE.base.replace(/\/$/, '') + id;
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;
}
