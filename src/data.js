// Datos compartidos entre idiomas: servicios, proyectos de la galería y pares antes/después.
// Los textos traducidos van en src/i18n/. Aquí solo lo que no depende del idioma
// (o los textos cortos de cada proyecto, que van juntos en en/es para editarlos fácil).

export const SERVICES = [
  { id: 'kitchen', icon: 'kitchen', img: 'kitchen1' },
  { id: 'bathroom', icon: 'bath', img: 'bath1' },
  { id: 'flooring', icon: 'tiles', img: 'floor1' },
  { id: 'lighting', icon: 'bulb', img: 'light1' },
  { id: 'interior', icon: 'roller', img: 'interior2' },
  { id: 'outdoor', icon: 'pergola', img: 'pergola1' },
  { id: 'general', icon: 'hammer', img: 'work' },
];

// Categorías de la galería (las pide la especificación).
export const GALLERY_CATS = ['kitchens', 'bathrooms', 'flooring', 'interior', 'outdoor', 'pergolas', 'lighting'];

// Proyectos de muestra. Reemplazar por proyectos reales (fase 2: se cargarán desde el panel admin).
export const PROJECTS = [
  { cat: 'kitchens', img: 'kitchen1', market: 'miami', en: 'Open kitchen with quartz island', es: 'Cocina abierta con isla de cuarzo' },
  { cat: 'bathrooms', img: 'bath2', market: 'vegas', en: 'Stone-tile spa bathroom', es: 'Baño tipo spa con piedra' },
  { cat: 'pergolas', img: 'pergola1', market: 'miami', en: 'Wood pergola dining area', es: 'Comedor exterior con pérgola de madera' },
  { cat: 'flooring', img: 'floor1', market: 'miami', en: 'Large-format porcelain floors', es: 'Porcelanato de gran formato' },
  { cat: 'lighting', img: 'light1', market: 'vegas', en: 'Recessed LED living room', es: 'Sala con luces LED empotradas' },
  { cat: 'kitchens', img: 'kitchen2', market: 'vegas', en: 'Family kitchen with bar seating', es: 'Cocina familiar con barra' },
  { cat: 'outdoor', img: 'outdoor1', market: 'miami', en: 'Poolside patio remodel', es: 'Remodelación de patio junto a la piscina' },
  { cat: 'bathrooms', img: 'bath3', market: 'miami', en: 'Marble shower & glass enclosure', es: 'Ducha de mármol con mampara de cristal' },
  { cat: 'interior', img: 'interior2', market: 'vegas', en: 'Full living area renovation', es: 'Renovación completa de sala' },
  { cat: 'flooring', img: 'floor3', market: 'vegas', en: 'Wood-look flooring install', es: 'Instalación de piso tipo madera' },
  { cat: 'outdoor', img: 'outdoor2', market: 'vegas', en: 'Outdoor entertainment space', es: 'Espacio exterior para reuniones' },
  { cat: 'lighting', img: 'light2', market: 'miami', en: 'Accent lighting & fireplace wall', es: 'Iluminación decorativa y chimenea' },
  { cat: 'kitchens', img: 'kitchen3', market: 'miami', en: 'Bright white kitchen refresh', es: 'Renovación de cocina blanca' },
  { cat: 'pergolas', img: 'pergola3', market: 'vegas', en: 'Shade pergola structure', es: 'Pérgola para sombra' },
  { cat: 'interior', img: 'interior3', market: 'miami', en: 'Drywall, paint & trim finish', es: 'Drywall, pintura y molduras' },
  { cat: 'bathrooms', img: 'bath4', market: 'vegas', en: 'Vanity & mirror upgrade', es: 'Nuevo vanity y espejo' },
];

// Pares antes/después de muestra (fotos distintas, solo para demostrar el efecto).
export const BEFORE_AFTER = [
  { before: 'before1', after: 'kitchen1', en: 'Kitchen remodel', es: 'Remodelación de cocina', market: 'miami' },
  { before: 'before2', after: 'interior2', en: 'Interior renovation', es: 'Renovación interior', market: 'vegas' },
  { before: 'before3', after: 'light3', en: 'Living room & LED lighting', es: 'Sala e iluminación LED', market: 'miami' },
];
