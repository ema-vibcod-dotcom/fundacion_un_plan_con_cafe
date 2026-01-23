import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductosDisponibles } from '../services/productoService';

export default function Store() {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const response = await getProductosDisponibles();
      setProductos(response.data || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener la imagen principal del producto
  const getProductImage = (producto) => {
    if (producto.attributes.imageUrl || producto.attributes.image_url) {
      return producto.attributes.imageUrl || producto.attributes.image_url;
    }
    if (producto.attributes.galeriaImagenes && producto.attributes.galeriaImagenes.length > 0) {
      return typeof producto.attributes.galeriaImagenes[0] === 'string' 
        ? producto.attributes.galeriaImagenes[0]
        : producto.attributes.galeriaImagenes[0].url;
    }
    return null;
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 px-4 md:px-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-2 md:mb-3">
          {translate('store_title')}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
          {translate('store_subtitle')}
        </p>
      </div>

      {loading ? (
        <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 text-center">
          <div className="text-amber-900">Cargando productos...</div>
        </section>
      ) : productos.length === 0 ? (
        <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 text-center md:mb-12">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 md:w-8 md:h-8 text-amber-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
              {translate('store_coming_soon_title')}
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl">
              {translate('store_coming_soon_message')}
            </p>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => {
            const imageUrl = getProductImage(producto);
            const isDisponible = producto.attributes.estado === 'disponible' && producto.attributes.activo;
            const stockBajo = producto.attributes.stock < 10 && producto.attributes.stock > 0;

            return (
              <div key={producto.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Imagen principal */}
                {imageUrl && (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt={producto.attributes.nombre}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {stockBajo && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Stock Bajo
                      </div>
                    )}
                    {producto.attributes.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Agotado
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4">
                  {/* Nombre */}
                  <h3 className="text-lg font-bold text-amber-900 mb-2">
                    {producto.attributes.nombre}
                  </h3>

                  {/* Descripción corta */}
                  {producto.attributes.descripcionCorta && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {producto.attributes.descripcionCorta}
                    </p>
                  )}

                  {/* Creador */}
                  {producto.attributes.nombreCreador && (
                    <p className="text-xs text-gray-500 mb-3">
                      Por <span className="font-semibold">{producto.attributes.nombreCreador}</span>
                    </p>
                  )}

                  {/* Precio y Estado */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xl font-bold text-amber-900">
                        ${producto.attributes.precio?.toFixed(2) || '0.00'} USD
                      </p>
                      {producto.attributes.stock !== undefined && (
                        <p className="text-xs text-gray-500">
                          Stock: {producto.attributes.stock}
                        </p>
                      )}
                    </div>
                    <div>
                      {isDisponible ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Disponible
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                          No Disponible
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botón de compra */}
                  {isDisponible && (
                    <button
                      onClick={() => navigate(`/product/${producto.id}`)}
                      className="w-full bg-amber-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-800 transition text-sm"
                    >
                      Ver Detalles
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
