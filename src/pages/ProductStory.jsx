import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { getProductoById } from '../services/productoService';
import VideoPlayer from '../components/VideoPlayer';
import VideoModal from '../components/VideoModal';

export default function ProductStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    loadProducto();
  }, [id]);

  const loadProducto = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductoById(id);
      
      if (!data) {
        setError('Producto no encontrado');
        return;
      }
      
      setProducto(data);
    } catch (err) {
      console.error('Error cargando producto:', err);
      setError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto);
      // Opcional: mostrar mensaje de éxito
      alert('Producto agregado al carrito');
    }
  };

  const handleContinueToPurchase = () => {
    handleAddToCart();
    navigate('/cart');
  };

  // Obtener imagen principal
  const getProductImage = () => {
    if (!producto) return null;
    const { attributes } = producto;
    
    if (attributes.imageUrl || attributes.image_url) {
      return attributes.imageUrl || attributes.image_url;
    }
    if (attributes.galeriaImagenes && attributes.galeriaImagenes.length > 0) {
      return typeof attributes.galeriaImagenes[0] === 'string' 
        ? attributes.galeriaImagenes[0]
        : attributes.galeriaImagenes[0].url;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="text-amber-900 text-lg">Cargando producto...</div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="text-red-600 text-lg mb-4">{error || 'Producto no encontrado'}</div>
        <button
          onClick={() => navigate('/store')}
          className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  const { attributes } = producto;
  const imageUrl = getProductImage();
  const videoUrl = attributes.videoUrl || attributes.video_url;
  const isDisponible = attributes.estado === 'disponible' && attributes.activo;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => navigate('/store')}
        className="flex items-center gap-2 text-amber-900 hover:text-amber-800 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver a la tienda
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Imagen principal */}
        {imageUrl && (
          <div className="relative w-full h-64 md:h-96 bg-gray-100">
            <img
              src={imageUrl}
              alt={attributes.nombre}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {videoUrl && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute bottom-4 right-4 bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition flex items-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Ver Video
              </button>
            )}
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {/* Información principal */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
              {attributes.nombre}
            </h1>
            {attributes.nombreCreador && (
              <p className="text-gray-600 text-lg">
                Por <span className="font-semibold text-amber-900">{attributes.nombreCreador}</span>
              </p>
            )}
          </div>

          {/* Precio y disponibilidad */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <p className="text-3xl font-bold text-amber-900">
                ${attributes.precio?.toFixed(2) || '0.00'} USD
              </p>
              {attributes.stock !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  Stock disponible: {attributes.stock}
                </p>
              )}
            </div>
            <div>
              {isDisponible ? (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  Disponible
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                  No Disponible
                </span>
              )}
            </div>
          </div>

          {/* Descripción */}
          {attributes.descripcionCorta && (
            <div>
              <h2 className="text-xl font-semibold text-amber-900 mb-2">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{attributes.descripcionCorta}</p>
            </div>
          )}

          {/* Historia del creador */}
          {attributes.historiaCreador && (
            <div>
              <h2 className="text-xl font-semibold text-amber-900 mb-2">Historia del Creador</h2>
              <div
                className="text-gray-700 leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: attributes.historiaCreador }}
              />
            </div>
          )}

          {/* Video inline (opcional, más pequeño) */}
          {videoUrl && (
            <div>
              <h2 className="text-xl font-semibold text-amber-900 mb-2">Video del Producto</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <VideoPlayer
                  videoUrl={videoUrl}
                  title={`Video de ${attributes.nombre}`}
                />
              </div>
            </div>
          )}

          {/* Botones de acción */}
          {isDisponible && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition"
              >
                Agregar al Carrito
              </button>
              <button
                onClick={handleContinueToPurchase}
                className="flex-1 px-6 py-3 bg-white border-2 border-amber-900 text-amber-900 rounded-lg font-semibold hover:bg-amber-50 transition"
              >
                Continuar a Compra
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de video */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={videoUrl}
        title={`Video de ${attributes.nombre}`}
      />
    </div>
  );
}
