import { useState, useEffect } from 'react';
import { getProyectos } from '../../services/proyectoService';
import { apiFetch } from '../../services/apiConfig';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUrlInput from './ImageUrlInput';
import VideoUrlInput from '../VideoUrlInput';

export default function AdminProjects() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { translate } = useLanguage();

  useEffect(() => {
    loadProyectos();
  }, []);

  const loadProyectos = async () => {
    try {
      setLoading(true);
      const response = await getProyectos({ pagination: { page: 1, pageSize: 50 } });
      setProyectos(response.data || []);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
      alert('Error al cargar proyectos. Verifica la configuración de la API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (proyecto) => {
    setEditingProject(proyecto);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      return;
    }

    try {
      await apiFetch(`/api/proyectos?id=${id}`, {
        method: 'DELETE',
      });
      loadProyectos();
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
      alert('Error al eliminar el proyecto');
    }
  };

  const handleSave = async (projectData) => {
    try {
      // Convertir formato de Strapi a formato de Supabase
      const supabaseData = {
        titulo: projectData.titulo,
        descripcion: projectData.descripcion,
        estado: projectData.estado,
        fecha_inicio: projectData.fechaInicio,
        fecha_finalizacion: projectData.fechaFinalizacion || null,
        galeria_imagenes: projectData.galeriaImagenes || [],
        video_corto: projectData.videoCorto || null,
        image_url: projectData.imageUrl || null,
        video_url: projectData.videoUrl || null,
        slug: projectData.slug || projectData.titulo.toLowerCase().replace(/\s+/g, '-'),
        voluntarios: projectData.voluntarios || 0,
        porcentaje_financiado: projectData.porcentajeFinanciado || 0,
        socios: projectData.socios || 0,
      };
      
      if (editingProject) {
        // Editar
        await apiFetch(`/api/proyectos?id=${editingProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(supabaseData),
        });
      } else {
        // Crear
        await apiFetch('/api/proyectos', {
          method: 'POST',
          body: JSON.stringify(supabaseData),
        });
      }

      setShowForm(false);
      setEditingProject(null);
      loadProyectos();
    } catch (error) {
      console.error('Error guardando proyecto:', error);
      alert('Error al guardar el proyecto. Verifica la configuración de la API.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-amber-900">Cargando proyectos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-amber-900">
          {translate('admin_projects_title') || 'Gestión de Proyectos'}
        </h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Crear Proyecto
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}

      <div className="space-y-4">
        {proyectos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay proyectos. Crea uno nuevo para comenzar.
          </div>
        ) : (
          proyectos.map((proyecto) => (
            <ProjectCard
              key={proyecto.id}
              proyecto={proyecto}
              onEdit={handleEdit}
              onDelete={handleDelete}
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

function ProjectCard({ proyecto, onEdit, onDelete }) {
  const { attributes } = proyecto;
  const estadoColors = {
    en_curso: 'bg-blue-100 text-blue-800',
    completado: 'bg-green-100 text-green-800',
    urgente: 'bg-red-100 text-red-800',
  };

  // Obtener imagen del proyecto
  const getProjectImage = () => {
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

  const imageUrl = getProjectImage();
  const videoUrl = attributes.videoUrl || attributes.video_url || attributes.videoCorto?.url || attributes.video_corto;

  return (
    <div className="bg-white border-2 rounded-lg p-4 border-gray-200">
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
                    alt={attributes.titulo}
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
                  <CompactVideoPlayer videoUrl={videoUrl} title={attributes.titulo} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sección de información */}
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="text-lg font-semibold text-amber-900">{attributes.titulo}</h3>
              <span className={`px-2 py-1 text-xs rounded ${estadoColors[attributes.estado] || estadoColors.en_curso}`}>
                {attributes.estado?.replace('_', ' ') || 'en_curso'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {attributes.descripcion || 'Sin descripción'}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {attributes.fechaInicio && (
                <span className="text-gray-600">
                  Inicio: {new Date(attributes.fechaInicio).toLocaleDateString('es-ES')}
                </span>
              )}
              {attributes.voluntarios > 0 && (
                <span className="text-gray-600">Voluntarios: {attributes.voluntarios}</span>
              )}
              {attributes.porcentajeFinanciado > 0 && (
                <span className="text-gray-600">Financiado: {attributes.porcentajeFinanciado}%</span>
              )}
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col gap-2 md:min-w-[120px]">
            <button
              onClick={() => onEdit(proyecto)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(proyecto.id)}
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

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: project?.attributes?.titulo || '',
    descripcion: project?.attributes?.descripcion || '',
    estado: project?.attributes?.estado || 'en_curso',
    fechaInicio: project?.attributes?.fechaInicio || '',
    fechaFinalizacion: project?.attributes?.fechaFinalizacion || '',
    voluntarios: project?.attributes?.voluntarios || 0,
    porcentajeFinanciado: project?.attributes?.porcentajeFinanciado || 0,
    imageUrl: project?.attributes?.imageUrl || project?.attributes?.image_url || '',
    videoUrl: project?.attributes?.videoUrl || project?.attributes?.video_url || project?.attributes?.videoCorto?.url || project?.attributes?.video_corto || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.descripcion) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    onSave({
      ...formData,
      voluntarios: parseInt(formData.voluntarios) || 0,
      porcentajeFinanciado: parseInt(formData.porcentajeFinanciado) || 0,
    });
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">
        {project ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            <option value="en_curso">En Curso</option>
            <option value="completado">Completado</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
            <input
              type="date"
              value={formData.fechaInicio}
              onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Finalización</label>
            <input
              type="date"
              value={formData.fechaFinalizacion}
              onChange={(e) => setFormData({ ...formData, fechaFinalizacion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voluntarios</label>
            <input
              type="number"
              min="0"
              value={formData.voluntarios}
              onChange={(e) => setFormData({ ...formData, voluntarios: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje Financiado (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.porcentajeFinanciado}
              onChange={(e) => setFormData({ ...formData, porcentajeFinanciado: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
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
                Agrega una imagen del proyecto usando una URL pública
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
                label="URL de Video del Proyecto"
              />
            </div>
          </div>
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
