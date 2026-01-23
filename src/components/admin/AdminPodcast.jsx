import { useState, useEffect } from 'react';
import { getEpisodiosPodcast } from '../../services/podcastService';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AdminPodcast() {
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState(null);
  const { translate } = useLanguage();

  useEffect(() => {
    loadEpisodios();
  }, []);

  const loadEpisodios = async () => {
    try {
      setLoading(true);
      const response = await getEpisodiosPodcast({ pagination: { page: 1, pageSize: 50 } });
      setEpisodios(response.data || []);
    } catch (error) {
      console.error('Error cargando episodios:', error);
      alert('Error al cargar episodios. Verifica la configuración de la API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingEpisode(null);
    setShowForm(true);
  };

  const handleEdit = (episodio) => {
    setEditingEpisode(episodio);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este episodio?')) {
      return;
    }

    try {
      const { apiFetch } = await import('../../services/apiConfig');
      await apiFetch(`/api/podcast?id=${id}`, {
        method: 'DELETE',
      });
      loadEpisodios();
    } catch (error) {
      console.error('Error eliminando episodio:', error);
      alert('Error al eliminar el episodio');
    }
  };

  const handleSave = async (episodeData) => {
    try {
      const { apiFetch } = await import('../../services/apiConfig');
      
      // Convertir formato de Strapi a formato de Supabase
      const supabaseData = {
        titulo: episodeData.titulo,
        descripcion: episodeData.descripcion,
        fecha: episodeData.fecha,
        url_spotify: episodeData.urlSpotify || null,
        url_apple_podcast: episodeData.urlApplePodcast || null,
        url_youtube: episodeData.urlYoutube || null,
        imagen_portada: episodeData.imagenPortada || null,
        slug: episodeData.slug || episodeData.titulo.toLowerCase().replace(/\s+/g, '-'),
        numero_episodio: episodeData.numeroEpisodio || null,
      };
      
      if (editingEpisode) {
        // Editar
        await apiFetch(`/api/podcast?id=${editingEpisode.id}`, {
          method: 'PUT',
          body: JSON.stringify(supabaseData),
        });
      } else {
        // Crear
        await apiFetch('/api/podcast', {
          method: 'POST',
          body: JSON.stringify(supabaseData),
        });
      }

      setShowForm(false);
      setEditingEpisode(null);
      loadEpisodios();
    } catch (error) {
      console.error('Error guardando episodio:', error);
      alert('Error al guardar el episodio. Verifica la configuración de la API.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-amber-900">Cargando episodios...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-amber-900">
          {translate('admin_podcast_title') || 'Gestión de Episodios'}
        </h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Crear Episodio
        </button>
      </div>

      {showForm && (
        <EpisodeForm
          episode={editingEpisode}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingEpisode(null);
          }}
        />
      )}

      <div className="space-y-4">
        {episodios.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay episodios. Crea uno nuevo para comenzar.
          </div>
        ) : (
          episodios.map((episodio) => (
            <EpisodeCard
              key={episodio.id}
              episodio={episodio}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

function EpisodeCard({ episodio, onEdit, onDelete }) {
  const { attributes } = episodio;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-amber-900">{attributes.titulo}</h3>
            {attributes.numeroEpisodio && (
              <span className="px-2 py-1 text-xs rounded bg-amber-100 text-amber-800">
                Episodio #{attributes.numeroEpisodio}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {attributes.descripcion?.substring(0, 150)}...
          </p>
          {attributes.fecha && (
            <p className="text-xs text-gray-500">
              {new Date(attributes.fecha).toLocaleDateString('es-ES')}
            </p>
          )}
          <div className="flex gap-2 mt-2 text-xs text-gray-500">
            {attributes.urlSpotify && <span>🎵 Spotify</span>}
            {attributes.urlApplePodcast && <span>🍎 Apple</span>}
            {attributes.urlYoutube && <span>▶️ YouTube</span>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(episodio)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(episodio.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function EpisodeForm({ episode, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: episode?.attributes?.titulo || '',
    descripcion: episode?.attributes?.descripcion || '',
    fecha: episode?.attributes?.fecha || '',
    urlSpotify: episode?.attributes?.urlSpotify || '',
    urlApplePodcast: episode?.attributes?.urlApplePodcast || '',
    urlYoutube: episode?.attributes?.urlYoutube || '',
    numeroEpisodio: episode?.attributes?.numeroEpisodio || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.descripcion || !formData.fecha) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    onSave({
      ...formData,
      numeroEpisodio: formData.numeroEpisodio ? parseInt(formData.numeroEpisodio) : null,
    });
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">
        {episode ? 'Editar Episodio' : 'Crear Nuevo Episodio'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Episodio</label>
            <input
              type="number"
              min="1"
              value={formData.numeroEpisodio}
              onChange={(e) => setFormData({ ...formData, numeroEpisodio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de Spotify</label>
          <input
            type="url"
            value={formData.urlSpotify}
            onChange={(e) => setFormData({ ...formData, urlSpotify: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            placeholder="https://open.spotify.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de Apple Podcast</label>
          <input
            type="url"
            value={formData.urlApplePodcast}
            onChange={(e) => setFormData({ ...formData, urlApplePodcast: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            placeholder="https://podcasts.apple.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de YouTube</label>
          <input
            type="url"
            value={formData.urlYoutube}
            onChange={(e) => setFormData({ ...formData, urlYoutube: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            placeholder="https://www.youtube.com/..."
          />
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
