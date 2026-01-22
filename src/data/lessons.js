// Datos mock de lecciones
export const lessons = [
  {
    id: 1,
    title: 'Introducción al Español Básico',
    description: 'Aprende los fundamentos del español con vocabulario esencial para la vida diaria en comunidades cafetaleras.',
    level: 'beginner',
    active: true
  },
  {
    id: 2,
    title: 'Números y Colores',
    description: 'Domina los números del 1 al 100 y los colores básicos en español e idiomas indígenas locales.',
    level: 'beginner',
    active: true
  },
  {
    id: 3,
    title: 'Conversaciones Cotidianas',
    description: 'Practica diálogos comunes sobre el trabajo, la familia y la comunidad en español.',
    level: 'intermediate',
    active: true
  },
  {
    id: 4,
    title: 'Vocabulario del Café',
    description: 'Aprende términos especializados relacionados con el cultivo y procesamiento del café.',
    level: 'intermediate',
    active: true
  },
  {
    id: 5,
    title: 'Literatura y Cultura',
    description: 'Explora textos literarios y expresiones culturales de comunidades cafetaleras.',
    level: 'advanced',
    active: true
  },
  {
    id: 6,
    title: 'Negocios y Comercio',
    description: 'Desarrolla habilidades de comunicación para negocios y comercio en español e inglés.',
    level: 'advanced',
    active: true
  }
];

// Función helper para agrupar por nivel
export function getLessonsByLevel() {
  return {
    beginner: lessons.filter(l => l.level === 'beginner' && l.active),
    intermediate: lessons.filter(l => l.level === 'intermediate' && l.active),
    advanced: lessons.filter(l => l.level === 'advanced' && l.active)
  };
}
