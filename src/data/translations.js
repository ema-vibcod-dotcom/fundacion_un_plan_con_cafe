// Sistema de traducciones
export const TRANSLATIONS = {
  es: {
    // Home page
    hero_title: 'Transformando vidas a través del café y la educación',
    hero_description: 'Somos una fundación comprometida con el desarrollo comunitario, la educación bilingüe y el empoderamiento de comunidades cafetaleras.',
    donate_button: 'Donar ahora',
    impact_title: 'Impacto Social',
    impact_description: 'Hemos apoyado a más de {count} familias en comunidades cafetaleras, proporcionando recursos educativos y oportunidades de desarrollo económico sostenible.',
    families: 'Familias',
    communities: 'Comunidades',
    products_title: 'Productos con Valor Social',
    products_description: 'Cada producto que compras apoya directamente a las comunidades cafetaleras. Desde café de origen hasta artesanías locales.',
    view_products: 'Ver productos →',
    education_title: 'Educación Bilingüe',
    education_description: 'Programas de educación bilingüe gratuitos para niños y adultos en comunidades cafetaleras. Fortalecemos tanto el español como las lenguas indígenas locales.',
    explore_lessons: 'Explorar lecciones →',
    podcast_title: 'Podcast',
    podcast_description: 'Escucha historias inspiradoras de las comunidades que apoyamos, conversaciones sobre sostenibilidad, cultura cafetalera y el impacto de la educación bilingüe.',
    listen_podcast: 'Escuchar podcast →',
    cta_title: '¿Listo para hacer la diferencia?',
    cta_description: 'Tu apoyo puede transformar vidas. Cada donación, cada compra, cada lección aprendida nos acerca más a un futuro mejor.',
    donate_now: 'Donar ahora',
  },
  en: {
    // Home page
    hero_title: 'Transforming lives through coffee and education',
    hero_description: 'We are a foundation committed to community development, bilingual education, and the empowerment of coffee-growing communities.',
    donate_button: 'Donate now',
    impact_title: 'Social Impact',
    impact_description: 'We have supported more than {count} families in coffee-growing communities, providing educational resources and sustainable economic development opportunities.',
    families: 'Families',
    communities: 'Communities',
    products_title: 'Products with Social Value',
    products_description: 'Every product you buy directly supports coffee-growing communities. From origin coffee to local crafts.',
    view_products: 'View products →',
    education_title: 'Bilingual Education',
    education_description: 'Free bilingual education programs for children and adults in coffee-growing communities. We strengthen both Spanish and local indigenous languages.',
    explore_lessons: 'Explore lessons →',
    podcast_title: 'Podcast',
    podcast_description: 'Listen to inspiring stories from the communities we support, conversations about sustainability, coffee culture, and the impact of bilingual education.',
    listen_podcast: 'Listen to podcast →',
    cta_title: 'Ready to make a difference?',
    cta_description: 'Your support can transform lives. Every donation, every purchase, every lesson learned brings us closer to a better future.',
    donate_now: 'Donate now',
  }
};

// Función helper para traducir
export function translate(key, lang = 'es', params = {}) {
  const translation = TRANSLATIONS[lang]?.[key] || TRANSLATIONS.es[key] || key;
  
  // Reemplazar placeholders
  if (params && Object.keys(params).length > 0) {
    return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }
  
  return translation;
}
