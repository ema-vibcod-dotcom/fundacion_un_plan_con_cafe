// Datos mock de lecciones
export const lessons = [
  {
    id: 1,
    title: 'Introducción al Inglés Básico',
    description: 'Aprende los fundamentos del inglés con vocabulario esencial para la vida diaria en comunidades cafetaleras. Saludos, presentaciones y frases básicas.',
    level: 'beginner',
    active: true
  },
  {
    id: 2,
    title: 'Números y Colores en Inglés',
    description: 'Domina los números del 1 al 100 y los colores básicos en inglés. Aprende a contar y describir en inglés desde tu contexto.',
    level: 'beginner',
    active: true
  },
  {
    id: 3,
    title: 'Conversaciones Cotidianas en Inglés',
    description: 'Practica diálogos comunes en inglés sobre el trabajo en el café, la familia y la comunidad. Situaciones reales de tu día a día.',
    level: 'intermediate',
    active: true
  },
  {
    id: 4,
    title: 'Vocabulario del Café en Inglés',
    description: 'Aprende términos en inglés relacionados con el cultivo, procesamiento y comercialización del café. Vocabulario especializado para tu trabajo.',
    level: 'intermediate',
    active: true
  },
  {
    id: 5,
    title: 'Inglés para Negocios del Café',
    description: 'Desarrolla habilidades de comunicación en inglés para negociar, vender y relacionarte con compradores internacionales de café.',
    level: 'advanced',
    active: true
  },
  {
    id: 6,
    title: 'Inglés para Oportunidades Económicas',
    description: 'Aprende inglés avanzado para acceder a mejores oportunidades laborales, turismo comunitario y emprendimientos relacionados con el café.',
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
