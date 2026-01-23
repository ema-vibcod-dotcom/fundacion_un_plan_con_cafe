import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProyectos } from '../services/proyectoService';
import VideoPlayer from '../components/VideoPlayer';
import VideoModal from '../components/VideoModal';

export default function Projects() {
  const { translate } = useLanguage();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    loadProyectos();
  }, []);

  const loadProyectos = async () => {
    try {
      setLoading(true);
      const response = await getProyectos({ sort: 'fechaInicio:desc' });
      setProyectos(response.data || []);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
      setProyectos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (videoUrl, title) => {
    setSelectedVideo({ url: videoUrl, title });
    setShowVideoModal(true);
  };

  // Obtener imagen del proyecto
  const getProjectImage = (proyecto) => {
    if (proyecto.attributes.imageUrl || proyecto.attributes.image_url) {
      return proyecto.attributes.imageUrl || proyecto.attributes.image_url;
    }
    if (proyecto.attributes.galeriaImagenes && proyecto.attributes.galeriaImagenes.length > 0) {
      return typeof proyecto.attributes.galeriaImagenes[0] === 'string'
        ? proyecto.attributes.galeriaImagenes[0]
        : proyecto.attributes.galeriaImagenes[0].url;
    }
    return null;
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto space-y-6 px-4 md:px-6 pb-8 md:pb-12">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4">
          {translate('projects_title')}
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base px-2 md:px-4 max-w-2xl mx-auto">
          {translate('projects_subtitle')}
        </p>
      </div>

      {loading ? (
        <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 text-center">
          <div className="text-amber-900">Cargando proyectos...</div>
        </section>
      ) : proyectos.length === 0 ? (
        <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 text-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
              No hay proyectos disponibles
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl">
              Los proyectos se mostrarán aquí cuando estén disponibles.
            </p>
          </div>
        </section>
      ) : (
        proyectos.map((proyecto) => {
          const imageUrl = getProjectImage(proyecto);
          const videoUrl = proyecto.attributes.videoCorto?.url || proyecto.attributes.video_corto;
          const estadoColors = {
            en_curso: 'bg-blue-100 text-blue-800',
            completado: 'bg-green-100 text-green-800',
            urgente: 'bg-red-100 text-red-800',
          };

          return (
            <section key={proyecto.id} className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8">
              {/* Imagen del proyecto */}
              {imageUrl && (
                <div className="mb-5 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={proyecto.attributes.titulo}
                    className="w-full h-48 md:h-64 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-5">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-amber-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 text-center sm:text-left">
                      {proyecto.attributes.titulo}
                    </h2>
                    <span className={`px-2 py-1 text-xs rounded ${estadoColors[proyecto.attributes.estado] || estadoColors.en_curso}`}>
                      {proyecto.attributes.estado?.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4 whitespace-pre-line">
                    {proyecto.attributes.descripcion}
                  </p>
                  
                  {/* Video del proyecto */}
                  {videoUrl && (
                    <div className="mb-4">
                      <VideoPlayer
                        videoUrl={videoUrl}
                        title={proyecto.attributes.titulo}
                        onVideoClick={(url, title) => handleVideoClick(url, title)}
                      />
                    </div>
                  )}

                  {/* Información adicional */}
                  {(proyecto.attributes.fechaInicio || proyecto.attributes.voluntarios || proyecto.attributes.porcentajeFinanciado) && (
                    <div className="bg-amber-50 rounded-lg p-4 md:p-5 border-l-4 border-amber-500">
                      {proyecto.attributes.fechaInicio && (
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold text-amber-900">Fecha de inicio:</span>{' '}
                          {new Date(proyecto.attributes.fechaInicio).toLocaleDateString('es-ES')}
                        </p>
                      )}
                      {proyecto.attributes.voluntarios > 0 && (
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold text-amber-900">Voluntarios:</span> {proyecto.attributes.voluntarios}
                        </p>
                      )}
                      {proyecto.attributes.porcentajeFinanciado > 0 && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-amber-900">Financiado:</span> {proyecto.attributes.porcentajeFinanciado}%
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* Modal de video */}
      {selectedVideo && (
        <VideoModal
          isOpen={showVideoModal}
          onClose={() => {
            setShowVideoModal(false);
            setSelectedVideo(null);
          }}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
