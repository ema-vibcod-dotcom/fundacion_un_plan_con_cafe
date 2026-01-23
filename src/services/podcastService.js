import { strapiFetch, getStrapiImageUrl } from './strapiConfig';

/**
 * Servicio para gestionar episodios del podcast desde Strapi
 */

/**
 * Obtener todos los episodios del podcast
 * @param {object} params - Parámetros de consulta
 * @returns {Promise<Array>} Lista de episodios
 */
export async function getEpisodiosPodcast(params = {}) {
  const {
    populate = '*',
    filters = {},
    sort = 'fecha:desc',
    pagination = { page: 1, pageSize: 20 },
  } = params;

  const queryParams = new URLSearchParams({
    'populate': populate,
    'sort': sort,
    'pagination[page]': pagination.page,
    'pagination[pageSize]': pagination.pageSize,
  });

  // Filtros
  if (filters.published) {
    queryParams.append('publicationState', filters.published ? 'live' : 'preview');
  }

  const response = await strapiFetch(`/api/episodios-podcast?${queryParams.toString()}`);
  
  // Procesar imagen de portada
  if (response.data) {
    response.data = response.data.map(episodio => ({
      ...episodio,
      attributes: {
        ...episodio.attributes,
        imagenPortada: episodio.attributes.imagenPortada?.data 
          ? {
              ...episodio.attributes.imagenPortada.data,
              url: getStrapiImageUrl(episodio.attributes.imagenPortada.data.attributes),
            }
          : null,
      },
    }));
  }

  return response;
}

/**
 * Obtener un episodio por ID
 * @param {number|string} id - ID del episodio
 * @returns {Promise<object>} Episodio
 */
export async function getEpisodioById(id) {
  const response = await strapiFetch(`/api/episodios-podcast/${id}?populate=*`);
  
  if (response.data) {
    const episodio = response.data;
    return {
      ...episodio,
      attributes: {
        ...episodio.attributes,
        imagenPortada: episodio.attributes.imagenPortada?.data 
          ? {
              ...episodio.attributes.imagenPortada.data,
              url: getStrapiImageUrl(episodio.attributes.imagenPortada.data.attributes),
            }
          : null,
      },
    };
  }

  return response;
}

/**
 * Obtener un episodio por slug
 * @param {string} slug - Slug del episodio
 * @returns {Promise<object>} Episodio
 */
export async function getEpisodioBySlug(slug) {
  const response = await strapiFetch(
    `/api/episodios-podcast?filters[slug][$eq]=${slug}&populate=*`
  );
  
  if (response.data && response.data.length > 0) {
    const episodio = response.data[0];
    return {
      ...episodio,
      attributes: {
        ...episodio.attributes,
        imagenPortada: episodio.attributes.imagenPortada?.data 
          ? {
              ...episodio.attributes.imagenPortada.data,
              url: getStrapiImageUrl(episodio.attributes.imagenPortada.data.attributes),
            }
          : null,
      },
    };
  }

  return null;
}

/**
 * Obtener los episodios más recientes
 * @param {number} limit - Número de episodios a obtener (default: 5)
 * @returns {Promise<Array>} Lista de episodios recientes
 */
export async function getEpisodiosRecientes(limit = 5) {
  return getEpisodiosPodcast({
    sort: 'fecha:desc',
    pagination: { page: 1, pageSize: limit },
  });
}

/**
 * Obtener episodio por número
 * @param {number} numero - Número del episodio
 * @returns {Promise<object>} Episodio
 */
export async function getEpisodioByNumero(numero) {
  const response = await strapiFetch(
    `/api/episodios-podcast?filters[numeroEpisodio][$eq]=${numero}&populate=*`
  );
  
  if (response.data && response.data.length > 0) {
    const episodio = response.data[0];
    return {
      ...episodio,
      attributes: {
        ...episodio.attributes,
        imagenPortada: episodio.attributes.imagenPortada?.data 
          ? {
              ...episodio.attributes.imagenPortada.data,
              url: getStrapiImageUrl(episodio.attributes.imagenPortada.data.attributes),
            }
          : null,
      },
    };
  }

  return null;
}

/**
 * Obtener URL de plataforma preferida
 * @param {object} episodio - Objeto del episodio
 * @param {string} preferencia - Preferencia de plataforma (spotify, apple, youtube)
 * @returns {string|null} URL de la plataforma
 */
export function getUrlPlataforma(episodio, preferencia = 'spotify') {
  if (!episodio?.attributes) return null;

  const { urlSpotify, urlApplePodcast, urlYoutube } = episodio.attributes;

  switch (preferencia) {
    case 'spotify':
      return urlSpotify || urlApplePodcast || urlYoutube || null;
    case 'apple':
      return urlApplePodcast || urlSpotify || urlYoutube || null;
    case 'youtube':
      return urlYoutube || urlSpotify || urlApplePodcast || null;
    default:
      return urlSpotify || urlApplePodcast || urlYoutube || null;
  }
}
