import { apiFetch } from './apiConfig';

/**
 * Servicio para gestionar episodios del podcast desde Vercel API
 */

/**
 * Obtener todos los episodios del podcast
 * @param {object} params - Parámetros de consulta
 * @returns {Promise<Array>} Lista de episodios
 */
export async function getEpisodiosPodcast(params = {}) {
  try {
    const response = await apiFetch('/api/podcast');
    
    let episodios = response.data || [];
    
    // Formatear para compatibilidad con estructura Strapi
    return {
      data: episodios.map(episodio => ({
        id: episodio.id,
        attributes: {
          titulo: episodio.titulo,
          descripcion: episodio.descripcion,
          fecha: episodio.fecha,
          urlSpotify: episodio.url_spotify,
          urlApplePodcast: episodio.url_apple_podcast,
          urlYoutube: episodio.url_youtube,
          imagenPortada: episodio.imagen_portada ? { url: episodio.imagen_portada } : null,
          imageUrl: episodio.image_url || null,
          image_url: episodio.image_url || null, // Mantener ambos para compatibilidad
          slug: episodio.slug,
          numeroEpisodio: episodio.numero_episodio,
        },
      })),
    };
  } catch (error) {
    console.error('Error obteniendo episodios:', error);
    return { data: [] };
  }
}

/**
 * Obtener un episodio por ID
 * @param {number|string} id - ID del episodio
 * @returns {Promise<object>} Episodio
 */
export async function getEpisodioById(id) {
  try {
    const response = await apiFetch(`/api/podcast?id=${id}`);
    
    if (response.data) {
      const episodio = response.data;
      return {
        id: episodio.id,
        attributes: {
          titulo: episodio.titulo,
          descripcion: episodio.descripcion,
          fecha: episodio.fecha,
          urlSpotify: episodio.url_spotify,
          urlApplePodcast: episodio.url_apple_podcast,
          urlYoutube: episodio.url_youtube,
          imagenPortada: episodio.imagen_portada ? { url: episodio.imagen_portada } : null,
          imageUrl: episodio.image_url || null,
          image_url: episodio.image_url || null, // Mantener ambos para compatibilidad
          slug: episodio.slug,
          numeroEpisodio: episodio.numero_episodio,
        },
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo episodio:', error);
    return null;
  }
}

/**
 * Obtener un episodio por slug
 * @param {string} slug - Slug del episodio
 * @returns {Promise<object>} Episodio
 */
export async function getEpisodioBySlug(slug) {
  try {
    const response = await getEpisodiosPodcast();
    const episodio = response.data?.find(e => e.attributes.slug === slug);
    
    if (episodio) {
      return episodio;
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo episodio por slug:', error);
    return null;
  }
}

/**
 * Obtener los episodios más recientes
 * @param {number} limit - Número de episodios a obtener (default: 5)
 * @returns {Promise<Array>} Lista de episodios recientes
 */
export async function getEpisodiosRecientes(limit = 5) {
  try {
    const response = await getEpisodiosPodcast();
    return {
      data: response.data.slice(0, limit),
    };
  } catch (error) {
    console.error('Error obteniendo episodios recientes:', error);
    return { data: [] };
  }
}

/**
 * Obtener episodio por número
 * @param {number} numero - Número del episodio
 * @returns {Promise<object>} Episodio
 */
export async function getEpisodioByNumero(numero) {
  try {
    const response = await getEpisodiosPodcast();
    const episodio = response.data?.find(e => e.attributes.numeroEpisodio === numero);
    
    if (episodio) {
      return episodio;
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo episodio por número:', error);
    return null;
  }
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
