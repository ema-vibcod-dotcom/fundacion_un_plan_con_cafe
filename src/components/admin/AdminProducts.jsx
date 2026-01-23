import { useState, useEffect } from 'react';
import { getProductos } from '../../services/productoService';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUrlInput from './ImageUrlInput';
import VideoUrlInput from '../VideoUrlInput';
import VideoPlayer from '../VideoPlayer';

export default function AdminProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { translate } = useLanguage();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const response = await getProductos({ pagination: { page: 1, pageSize: 50 } });
      setProductos(response.data || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
      alert('Error al cargar productos. Verifica la configuración de la API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const { apiFetch } = await import('../../services/apiConfig');
      await apiFetch(`/api/productos?id=${id}`, {
        method: 'DELETE',
      });
      loadProductos();
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleToggleActive = async (producto) => {
    try {
      const { apiFetch } = await import('../../services/apiConfig');
      await apiFetch(`/api/productos?id=${producto.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          activo: !producto.attributes.activo,
        }),
      });
      loadProductos();
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('Error al actualizar el producto');
    }
  };

  const handleSave = async (productData) => {
    try {
      const { apiFetch } = await import('../../services/apiConfig');
      
      // Convertir formato de Strapi a formato de Supabase
      const supabaseData = {
        nombre: productData.nombre,
        descripcion_corta: productData.descripcionCorta || '',
        precio: productData.precio,
        stock: productData.stock,
        estado: productData.estado,
        activo: productData.activo !== undefined ? productData.activo : true,
        galeria_imagenes: productData.galeriaImagenes || [],
        video_creador: productData.videoCreador || null,
        historia_creador: productData.historiaCreador,
        nombre_creador: productData.nombreCreador,
        image_url: productData.imageUrl || null,
        video_url: productData.videoUrl || null,
        slug: productData.slug || productData.nombre.toLowerCase().replace(/\s+/g, '-'),
      };
      
      if (editingProduct) {
        // Editar
        await apiFetch(`/api/productos?id=${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(supabaseData),
        });
      } else {
        // Crear
        await apiFetch('/api/productos', {
          method: 'POST',
          body: JSON.stringify(supabaseData),
        });
      }

      setShowForm(false);
      setEditingProduct(null);
      loadProductos();
    } catch (error) {
      console.error('Error guardando producto:', error);
      alert('Error al guardar el producto. Verifica la configuración de la API.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-amber-900">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-amber-900">
          {translate('admin_products_title') || 'Gestión de Productos'}
        </h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Crear Producto
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <div className="space-y-4">
        {productos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay productos. Crea uno nuevo para comenzar.
          </div>
        ) : (
          productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Componente compacto de video para el listado
function CompactVideoPlayer({ videoUrl, title }) {
  // Extraer ID de YouTube
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Extraer ID de Vimeo
  const getVimeoId = (url) => {
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Verificar si es MP4 directo
  const isMP4 = /\.mp4(\?.*)?$/i.test(videoUrl);

  // YouTube
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = getYouTubeId(videoUrl);
    if (videoId) {
      return (
        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: '0' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  // Vimeo
  if (videoUrl.includes('vimeo.com')) {
    const videoId = getVimeoId(videoUrl);
    if (videoId) {
      return (
        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: '0' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://player.vimeo.com/video/${videoId}?autoplay=0`}
            title={title}
            frameBorder="0"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  // MP4 directo
  if (isMP4) {
    return (
      <video
        src={videoUrl}
        controls
        className="w-full rounded-lg"
        preload="metadata"
        style={{ maxHeight: '180px' }}
      >
        Tu navegador no soporta videos.
      </video>
    );
  }

  return (
    <div className="p-3 text-center text-gray-400 text-xs">
      URL de video no reconocida
    </div>
  );
}

function ProductCard({ producto, onEdit, onDelete, onToggleActive }) {
  const { attributes } = producto;
  const stockBajo = attributes.stock < 10;
  
  // Obtener imagen principal
  const getProductImage = () => {
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

  const imageUrl = getProductImage();
  const videoUrl = attributes.videoUrl || attributes.video_url;

  return (
    <div className={`bg-white border-2 rounded-lg p-4 ${attributes.activo ? 'border-green-200' : 'border-gray-200 opacity-60'}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sección de previsualización de media */}
        {(imageUrl || videoUrl) && (
          <div className="md:w-64 lg:w-80 flex-shrink-0 space-y-3">
            {/* Previsualización de imagen */}
            {imageUrl && (
              <div className="relative">
                <p className="text-xs text-gray-500 mb-1 font-medium">Imagen:</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={imageUrl}
                    alt={attributes.nombre}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="p-4 text-center text-gray-400 text-xs">Imagen no disponible</div>';
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Previsualización de video */}
            {videoUrl && (
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium">Video:</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <CompactVideoPlayer videoUrl={videoUrl} title={attributes.nombre} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sección de información */}
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="text-lg font-semibold text-amber-900">{attributes.nombre}</h3>
              <span className={`px-2 py-1 text-xs rounded ${attributes.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {attributes.activo ? 'Activo' : 'Inactivo'}
              </span>
              {stockBajo && (
                <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                  Stock Bajo
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{attributes.descripcionCorta || 'Sin descripción'}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-amber-900 font-semibold">${attributes.precio?.toFixed(2) || '0.00'} USD</span>
              <span className="text-gray-600">Stock: {attributes.stock || 0}</span>
              <span className="text-gray-600">Por: {attributes.nombreCreador || 'N/A'}</span>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col gap-2 md:min-w-[120px]">
            <button
              onClick={() => onToggleActive(producto)}
              className={`px-3 py-1 text-sm rounded transition ${attributes.activo ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
            >
              {attributes.activo ? 'Desactivar' : 'Activar'}
            </button>
            <button
              onClick={() => onEdit(producto)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(producto.id)}
              className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: product?.attributes?.nombre || '',
    descripcionCorta: product?.attributes?.descripcionCorta || '',
    precio: product?.attributes?.precio || '',
    stock: product?.attributes?.stock || 0,
    estado: product?.attributes?.estado || 'disponible',
    activo: product?.attributes?.activo !== undefined ? product.attributes.activo : true,
    nombreCreador: product?.attributes?.nombreCreador || '',
    historiaCreador: product?.attributes?.historiaCreador || '',
    imageUrl: product?.attributes?.imageUrl || product?.attributes?.image_url || '',
    videoUrl: product?.attributes?.videoUrl || product?.attributes?.video_url || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    onSave({
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
    });
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">
        {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Corta</label>
          <input
            type="text"
            value={formData.descripcionCorta}
            onChange={(e) => setFormData({ ...formData, descripcionCorta: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            >
              <option value="disponible">Disponible</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Creador *</label>
          <input
            type="text"
            value={formData.nombreCreador}
            onChange={(e) => setFormData({ ...formData, nombreCreador: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Historia del Creador *</label>
          <textarea
            value={formData.historiaCreador}
            onChange={(e) => setFormData({ ...formData, historiaCreador: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>

        {/* Sección de Media */}
        <div className="border-t border-gray-200 pt-5 mt-5 bg-amber-50/30 rounded-lg p-4 sm:p-5">
          <div className="mb-5 flex items-start gap-2">
            <div className="mt-0.5">
              <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-amber-900 mb-1">Media</h4>
              <p className="text-xs sm:text-sm text-gray-500">
                Agrega imágenes y videos del producto usando URLs públicas
              </p>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <ImageUrlInput
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="URL de Imagen Principal"
              />
            </div>
            <div>
              <VideoUrlInput
                value={formData.videoUrl}
                onChange={(url) => setFormData({ ...formData, videoUrl: url })}
                label="URL de Video del Producto"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="activo"
            checked={formData.activo}
            onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
            className="w-4 h-4 text-amber-900 border-gray-300 rounded focus:ring-amber-500"
          />
          <label htmlFor="activo" className="text-sm text-gray-700">
            Producto activo
          </label>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
