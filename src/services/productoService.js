import { apiFetch } from './apiConfig';

/**
 * Servicio para gestionar productos desde Vercel API
 */

/**
 * Obtener todos los productos
 * @param {object} params - Parámetros de consulta
 * @returns {Promise<Array>} Lista de productos
 */
export async function getProductos(params = {}) {
  try {
    const response = await apiFetch('/api/productos');
    
    let productos = response.data || [];
    
    // Aplicar filtros
    if (params.filters?.activo !== undefined) {
      productos = productos.filter(p => p.activo === params.filters.activo);
    }
    
    if (params.filters?.estado) {
      productos = productos.filter(p => p.estado === params.filters.estado);
    }
    
    if (params.filters?.stockBajo) {
      productos = productos.filter(p => p.stock < 10);
    }
    
    // Formatear para compatibilidad con estructura Strapi
    return {
      data: productos.map(producto => ({
        id: producto.id,
        attributes: {
          nombre: producto.nombre,
          descripcionCorta: producto.descripcion_corta,
          precio: parseFloat(producto.precio),
          stock: producto.stock,
          estado: producto.estado,
          activo: producto.activo,
          galeriaImagenes: producto.galeria_imagenes || [],
          videoCreador: producto.video_creador ? { url: producto.video_creador } : null,
          historiaCreador: producto.historia_creador,
          nombreCreador: producto.nombre_creador,
          imageUrl: producto.image_url || null,
          image_url: producto.image_url || null, // Mantener ambos para compatibilidad
          videoUrl: producto.video_url || null,
          video_url: producto.video_url || null, // Mantener ambos para compatibilidad
          slug: producto.slug,
        },
      })),
    };
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return { data: [] };
  }
}

/**
 * Obtener un producto por ID
 * @param {number|string} id - ID del producto
 * @returns {Promise<object>} Producto
 */
export async function getProductoById(id) {
  try {
    const response = await apiFetch(`/api/productos?id=${id}`);
    
    if (response.data) {
      const producto = response.data;
      return {
        id: producto.id,
        attributes: {
          nombre: producto.nombre,
          descripcionCorta: producto.descripcion_corta,
          precio: parseFloat(producto.precio),
          stock: producto.stock,
          estado: producto.estado,
          activo: producto.activo,
          galeriaImagenes: producto.galeria_imagenes || [],
          videoCreador: producto.video_creador ? { url: producto.video_creador } : null,
          historiaCreador: producto.historia_creador,
          nombreCreador: producto.nombre_creador,
          imageUrl: producto.image_url || null,
          image_url: producto.image_url || null, // Mantener ambos para compatibilidad
          videoUrl: producto.video_url || null,
          video_url: producto.video_url || null, // Mantener ambos para compatibilidad
          slug: producto.slug,
        },
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    return null;
  }
}

/**
 * Obtener un producto por slug
 * @param {string} slug - Slug del producto
 * @returns {Promise<object>} Producto
 */
export async function getProductoBySlug(slug) {
  try {
    const response = await getProductos();
    const producto = response.data?.find(p => p.attributes.slug === slug);
    
    if (producto) {
      return producto;
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo producto por slug:', error);
    return null;
  }
}

/**
 * Obtener solo productos activos y disponibles
 * @returns {Promise<Array>} Lista de productos disponibles
 */
export async function getProductosDisponibles() {
  return getProductos({
    filters: {
      activo: true,
      estado: 'disponible',
    },
  });
}

/**
 * Obtener productos por categoría
 * @deprecated Las categorías han sido removidas. Esta función retorna todos los productos activos.
 * @param {string} categoria - Categoría (ignorado)
 * @returns {Promise<Array>} Lista de productos activos
 */
export async function getProductosByCategoria(categoria) {
  // Categorías removidas - retornar todos los productos activos
  return getProductos({
    filters: {
      activo: true,
    },
  });
}

/**
 * Obtener productos con stock bajo
 * @param {number} limite - Límite de stock (default: 10)
 * @returns {Promise<Array>} Lista de productos con stock bajo
 */
export async function getProductosStockBajo(limite = 10) {
  try {
    const response = await getProductos({
      filters: {
        activo: true,
        stockBajo: true,
      },
    });
    
    return {
      data: response.data.filter(p => p.attributes.stock < limite),
    };
  } catch (error) {
    console.error('Error obteniendo productos con stock bajo:', error);
    return { data: [] };
  }
}
