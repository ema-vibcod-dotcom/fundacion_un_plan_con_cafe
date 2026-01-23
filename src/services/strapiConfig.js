/**
 * Configuración para consumir la API de Strapi
 */

// URL base de la API de Strapi
// En desarrollo: http://localhost:1337
// En producción: https://tu-dominio-strapi.com
export const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

// Token de API (opcional, para contenido protegido)
export const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

/**
 * Función helper para construir URLs de imágenes de Strapi
 * @param {string|object} image - URL o objeto de imagen de Strapi
 * @param {string} size - Tamaño de la imagen (small, medium, large, thumbnail)
 * @returns {string} URL completa de la imagen
 */
export function getStrapiImageUrl(image, size = 'medium') {
  if (!image) return null;
  
  // Si es un objeto de Strapi
  if (typeof image === 'object' && image.url) {
    const url = image.url.startsWith('http') 
      ? image.url 
      : `${STRAPI_API_URL}${image.url}`;
    return url;
  }
  
  // Si es una URL string
  if (typeof image === 'string') {
    return image.startsWith('http') 
      ? image 
      : `${STRAPI_API_URL}${image}`;
  }
  
  return null;
}

/**
 * Función helper para construir URLs de videos de Strapi
 * @param {string|object} video - URL o objeto de video de Strapi
 * @returns {string} URL completa del video
 */
export function getStrapiVideoUrl(video) {
  if (!video) return null;
  
  if (typeof video === 'object' && video.url) {
    return video.url.startsWith('http') 
      ? video.url 
      : `${STRAPI_API_URL}${video.url}`;
  }
  
  if (typeof video === 'string') {
    return video.startsWith('http') 
      ? video 
      : `${STRAPI_API_URL}${video}`;
  }
  
  return null;
}

/**
 * Headers por defecto para las peticiones
 */
export function getStrapiHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  
  return headers;
}

/**
 * Función helper para hacer peticiones a Strapi
 * @param {string} endpoint - Endpoint de la API (ej: '/api/proyectos')
 * @param {object} options - Opciones de fetch
 * @returns {Promise} Respuesta de la API
 */
export async function strapiFetch(endpoint, options = {}) {
  const url = `${STRAPI_API_URL}${endpoint}`;
  const headers = {
    ...getStrapiHeaders(),
    ...(options.headers || {}),
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}
