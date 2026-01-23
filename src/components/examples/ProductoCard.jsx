/**
 * Ejemplo de componente para mostrar un producto
 * Este es un ejemplo de cómo consumir datos de Strapi
 */

import { useState, useEffect } from 'react';
import { getProductoById } from '../../services/productoService';

export default function ProductoCard({ productoId }) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducto() {
      try {
        setLoading(true);
        const data = await getProductoById(productoId);
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (productoId) {
      loadProducto();
    }
  }, [productoId]);

  if (loading) {
    return <div className="text-amber-900">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const { attributes } = producto;
  const isDisponible = attributes.estado === 'disponible' && attributes.activo;
  const stockBajo = attributes.stock < 10 && attributes.stock > 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Imagen principal */}
      {attributes.galeriaImagenes && attributes.galeriaImagenes.length > 0 && (
        <div className="relative">
          <img
            src={attributes.galeriaImagenes[0].url}
            alt={attributes.nombre}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          {/* Badge de stock */}
          {stockBajo && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Stock Bajo ({attributes.stock})
            </div>
          )}
          {attributes.stock === 0 && (
            <div className="absolute top-2 right-2 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Agotado
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Categoría */}
        {attributes.categoria && (
          <span className="text-xs text-amber-700 uppercase tracking-wide">
            {attributes.categoria}
          </span>
        )}

        {/* Nombre */}
        <h3 className="text-xl font-bold text-amber-900 mt-2 mb-2">
          {attributes.nombre}
        </h3>

        {/* Descripción corta */}
        {attributes.descripcionCorta && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {attributes.descripcionCorta}
          </p>
        )}

        {/* Creador */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Por <span className="font-semibold">{attributes.nombreCreador}</span>
          </p>
        </div>

        {/* Precio y Stock */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-amber-900">
              ${attributes.precio.toFixed(2)} USD
            </p>
            <p className="text-sm text-gray-500">
              Stock: {attributes.stock} unidades
            </p>
          </div>
          <div>
            {isDisponible ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Disponible
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                No Disponible
              </span>
            )}
          </div>
        </div>

        {/* Video del creador */}
        {attributes.videoCreador && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-amber-900 mb-2">
              Conoce al creador:
            </p>
            <video
              src={attributes.videoCreador.url}
              controls
              className="w-full rounded-lg"
              preload="metadata"
            >
              Tu navegador no soporta videos.
            </video>
          </div>
        )}

        {/* Historia del creador (primeros 200 caracteres) */}
        {attributes.historiaCreador && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-amber-900 mb-2">
              Historia del creador:
            </p>
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: attributes.historiaCreador.substring(0, 200) + '...',
              }}
            />
          </div>
        )}

        {/* Botón de compra (ejemplo) */}
        {isDisponible && (
          <button className="w-full mt-4 bg-amber-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition">
            Comprar ahora
          </button>
        )}
      </div>
    </div>
  );
}
