import { strapiFetch, getStrapiImageUrl, getStrapiVideoUrl } from './strapiConfig';

/**
 * Servicio para gestionar productos desde Strapi
 */

/**
 * Obtener todos los productos
 * @param {object} params - Parámetros de consulta
 * @returns {Promise<Array>} Lista de productos
 */
export async function getProductos(params = {}) {
  const {
    populate = '*',
    filters = {},
    sort = 'nombre:asc',
    pagination = { page: 1, pageSize: 20 },
  } = params;

  const queryParams = new URLSearchParams({
    'populate': populate,
    'sort': sort,
    'pagination[page]': pagination.page,
    'pagination[pageSize]': pagination.pageSize,
  });

  // Filtros
  if (filters.activo !== undefined) {
    queryParams.append('filters[activo][$eq]', filters.activo);
  }

  if (filters.estado) {
    queryParams.append('filters[estado][$eq]', filters.estado);
  }

  if (filters.categoria) {
    queryParams.append('filters[categoria][$eq]', filters.categoria);
  }

  if (filters.stockBajo) {
    queryParams.append('filters[stock][$lt]', 10); // Stock menor a 10
  }

  const response = await strapiFetch(`/api/productos?${queryParams.toString()}`);
  
  // Procesar imágenes y videos
  if (response.data) {
    response.data = response.data.map(producto => ({
      ...producto,
      attributes: {
        ...producto.attributes,
        galeriaImagenes: producto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
        videoCreador: producto.attributes.videoCreador?.data 
          ? {
              ...producto.attributes.videoCreador.data,
              url: getStrapiVideoUrl(producto.attributes.videoCreador.data.attributes),
            }
          : null,
      },
    }));
  }

  return response;
}

/**
 * Obtener un producto por ID
 * @param {number|string} id - ID del producto
 * @returns {Promise<object>} Producto
 */
export async function getProductoById(id) {
  const response = await strapiFetch(`/api/productos/${id}?populate=*`);
  
  if (response.data) {
    const producto = response.data;
    return {
      ...producto,
      attributes: {
        ...producto.attributes,
        galeriaImagenes: producto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
        videoCreador: producto.attributes.videoCreador?.data 
          ? {
              ...producto.attributes.videoCreador.data,
              url: getStrapiVideoUrl(producto.attributes.videoCreador.data.attributes),
            }
          : null,
      },
    };
  }

  return response;
}

/**
 * Obtener un producto por slug
 * @param {string} slug - Slug del producto
 * @returns {Promise<object>} Producto
 */
export async function getProductoBySlug(slug) {
  const response = await strapiFetch(
    `/api/productos?filters[slug][$eq]=${slug}&populate=*`
  );
  
  if (response.data && response.data.length > 0) {
    const producto = response.data[0];
    return {
      ...producto,
      attributes: {
        ...producto.attributes,
        galeriaImagenes: producto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
        videoCreador: producto.attributes.videoCreador?.data 
          ? {
              ...producto.attributes.videoCreador.data,
              url: getStrapiVideoUrl(producto.attributes.videoCreador.data.attributes),
            }
          : null,
      },
    };
  }

  return null;
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
    sort: 'nombre:asc',
  });
}

/**
 * Obtener productos por categoría
 * @param {string} categoria - Categoría (cafe, artesanias, otros)
 * @returns {Promise<Array>} Lista de productos
 */
export async function getProductosByCategoria(categoria) {
  return getProductos({
    filters: {
      categoria,
      activo: true,
    },
    sort: 'nombre:asc',
  });
}

/**
 * Obtener productos con stock bajo
 * @param {number} limite - Límite de stock (default: 10)
 * @returns {Promise<Array>} Lista de productos con stock bajo
 */
export async function getProductosStockBajo(limite = 10) {
  const response = await strapiFetch(
    `/api/productos?filters[stock][$lt]=${limite}&filters[activo][$eq]=true&populate=*&sort=stock:asc`
  );
  
  if (response.data) {
    response.data = response.data.map(producto => ({
      ...producto,
      attributes: {
        ...producto.attributes,
        galeriaImagenes: producto.attributes.galeriaImagenes?.data?.map(img => ({
          ...img,
          url: getStrapiImageUrl(img.attributes),
        })) || [],
      },
    }));
  }

  return response;
}
