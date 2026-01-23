/**
 * Configuración para consumir las API de Vercel Serverless Functions
 */

// URL base de la API
// En desarrollo: http://localhost:5173 (o la URL de tu Vite dev server)
// En producción: se usa la misma URL de la app (Vercel maneja el routing)
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // En desarrollo, usa localhost con el puerto de Vite
    return 'http://localhost:5173';
  }
  // En producción, usa la URL actual (Vercel)
  return window.location.origin;
};

export const API_URL = getApiUrl();

/**
 * Función helper para hacer peticiones a las API de Vercel
 * @param {string} endpoint - Endpoint de la API (ej: '/api/proyectos')
 * @param {object} options - Opciones de fetch
 * @returns {Promise} Respuesta de la API
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}
