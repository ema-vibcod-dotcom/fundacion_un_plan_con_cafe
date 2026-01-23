import { strapiFetch, getStrapiImageUrl, getStrapiVideoUrl } from './strapiConfig';

/**
 * Servicio para gestionar proyectos desde Strapi
 */

/**
 * Obtener todos los proyectos
 * @param {object} params - Parámetros de consulta (populate, filters, sort, pagination)
 * @returns {Promise<Array>} Lista de proyectos
 */
export async function getProyectos(params = {}) {
  const {
    populate = '*',
    filters = {},
    sort = 'fechaInicio:desc',
    pagination = { page: 1, pageSize: 10 },
  } = params;

  const queryParams = new URLSearchParams({
    'populate': populate,
    'sort': sort,
    'pagination[page]': pagination.page,
    'pagination[pageSize]': pagination.pageSize,
  });

  // Agregar filtros
  if (filters.estado) {
    queryParams.append('filters[estado][$eq]', filters.estado);
  }

  if (filters.published) {
    queryParams.append('publicationState', filters.published ? 'live' : 'preview');
  }

  const response = await strapiFetch(`/api/proyectos?${queryParams.toString()}`);
  
  // Procesar imágenes y videos
  if (response.data) {
    response.data = response.data.map(proyecto => ({
      ...proyecto,
      attributes: {
        ...proyecto.attributes,
        galeriaImagenes: proyecto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
        videoCorto: proyecto.attributes.videoCorto?.data 
          ? {
              ...proyecto.attributes.videoCorto.data,
              url: getStrapiVideoUrl(proyecto.attributes.videoCorto.data.attributes),
            }
          : null,
      },
    }));
  }

  return response;
}

/**
 * Obtener un proyecto por ID
 * @param {number|string} id - ID del proyecto
 * @returns {Promise<object>} Proyecto
 */
export async function getProyectoById(id) {
  const response = await strapiFetch(`/api/proyectos/${id}?populate=*`);
  
  if (response.data) {
    const proyecto = response.data;
    return {
      ...proyecto,
      attributes: {
        ...proyecto.attributes,
        galeriaImagenes: proyecto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
        videoCorto: proyecto.attributes.videoCorto?.data 
          ? {
              ...proyecto.attributes.videoCorto.data,
              url: getStrapiVideoUrl(proyecto.attributes.videoCorto.data.attributes),
            }
          : null,
      },
    };
  }

  return response;
}

/**
 * Obtener un proyecto por slug
 * @param {string} slug - Slug del proyecto
 * @returns {Promise<object>} Proyecto
 */
export async function getProyectoBySlug(slug) {
  const response = await strapiFetch(
    `/api/proyectos?filters[slug][$eq]=${slug}&populate=*`
  );
  
  if (response.data && response.data.length > 0) {
    const proyecto = response.data[0];
    return {
      ...proyecto,
      attributes: {
        ...proyecto.attributes,
        galeriaImagenes: proyecto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
        videoCorto: proyecto.attributes.videoCorto?.data 
          ? {
              ...proyecto.attributes.videoCorto.data,
              url: getStrapiVideoUrl(proyecto.attributes.videoCorto.data.attributes),
            }
          : null,
      },
    };
  }

  return null;
}

/**
 * Obtener proyectos por estado
 * @param {string} estado - Estado del proyecto (en_curso, completado, urgente)
 * @returns {Promise<Array>} Lista de proyectos
 */
export async function getProyectosByEstado(estado) {
  return getProyectos({
    filters: { estado },
    sort: 'fechaInicio:desc',
  });
}

/**
 * Obtener proyectos urgentes
 * @returns {Promise<Array>} Lista de proyectos urgentes
 */
export async function getProyectosUrgentes() {
  return getProyectosByEstado('urgente');
}

/**
 * Obtener proyectos en curso
 * @returns {Promise<Array>} Lista de proyectos en curso
 */
export async function getProyectosEnCurso() {
  return getProyectosByEstado('en_curso');
}
