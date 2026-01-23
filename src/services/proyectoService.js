import { apiFetch } from './apiConfig';

/**
 * Servicio para gestionar proyectos desde Vercel API
 */

/**
 * Obtener todos los proyectos
 * @param {object} params - Parámetros de consulta (filters, sort)
 * @returns {Promise<Array>} Lista de proyectos
 */
export async function getProyectos(params = {}) {
  try {
    const response = await apiFetch('/api/proyectos');
    
    // Formatear datos para compatibilidad con el código existente
    let proyectos = response.data || [];
    
    // Aplicar filtros si existen
    if (params.filters?.estado) {
      proyectos = proyectos.filter(p => p.estado === params.filters.estado);
    }
    
    // Aplicar ordenamiento
    if (params.sort === 'fechaInicio:desc' || params.sort?.includes('fecha_inicio')) {
      proyectos.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
    }
    
    // Formatear para compatibilidad con estructura Strapi
    return {
      data: proyectos.map(proyecto => ({
        id: proyecto.id,
        attributes: {
          titulo: proyecto.titulo,
          descripcion: proyecto.descripcion,
          estado: proyecto.estado,
          fechaInicio: proyecto.fecha_inicio,
          fechaFinalizacion: proyecto.fecha_finalizacion,
          galeriaImagenes: proyecto.galeria_imagenes || [],
          videoCorto: proyecto.video_corto ? { url: proyecto.video_corto } : null,
          imageUrl: proyecto.image_url || null,
          image_url: proyecto.image_url || null, // Mantener ambos para compatibilidad
          slug: proyecto.slug,
          voluntarios: proyecto.voluntarios,
          porcentajeFinanciado: proyecto.porcentaje_financiado,
          socios: proyecto.socios,
        },
      })),
    };
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    return { data: [] };
  }
}

/**
 * Obtener un proyecto por ID
 * @param {number|string} id - ID del proyecto
 * @returns {Promise<object>} Proyecto
 */
export async function getProyectoById(id) {
  try {
    const response = await apiFetch(`/api/proyectos?id=${id}`);
    
    if (response.data) {
      const proyecto = response.data;
      return {
        id: proyecto.id,
        attributes: {
          titulo: proyecto.titulo,
          descripcion: proyecto.descripcion,
          estado: proyecto.estado,
          fechaInicio: proyecto.fecha_inicio,
          fechaFinalizacion: proyecto.fecha_finalizacion,
          galeriaImagenes: proyecto.galeria_imagenes || [],
          videoCorto: proyecto.video_corto ? { url: proyecto.video_corto } : null,
          imageUrl: proyecto.image_url || null,
          image_url: proyecto.image_url || null, // Mantener ambos para compatibilidad
          slug: proyecto.slug,
          voluntarios: proyecto.voluntarios,
          porcentajeFinanciado: proyecto.porcentaje_financiado,
          socios: proyecto.socios,
        },
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    return null;
  }
}

/**
 * Obtener un proyecto por slug
 * @param {string} slug - Slug del proyecto
 * @returns {Promise<object>} Proyecto
 */
export async function getProyectoBySlug(slug) {
  try {
    const response = await getProyectos();
    const proyecto = response.data?.find(p => p.attributes.slug === slug);
    
    if (proyecto) {
      return proyecto;
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo proyecto por slug:', error);
    return null;
  }
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
