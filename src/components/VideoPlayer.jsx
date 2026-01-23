/**
 * Componente para mostrar videos de YouTube, Vimeo o MP4 directos
 * Responsive y sin autoplay
 * Si la URL no es reconocida, muestra un botón para abrir en modal
 */

export default function VideoPlayer({ videoUrl, title = 'Video del producto', onVideoClick }) {
  if (!videoUrl) return null;

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
        <div className="w-full">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
    }
  }

  // Vimeo
  if (videoUrl.includes('vimeo.com')) {
    const videoId = getVimeoId(videoUrl);
    if (videoId) {
      return (
        <div className="w-full">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://player.vimeo.com/video/${videoId}?autoplay=0`}
              title={title}
              frameBorder="0"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
    }
  }

  // MP4 directo
  if (isMP4) {
    return (
      <div className="w-full mt-4">
        <video
          src={videoUrl}
          controls
          className="w-full rounded-lg"
          preload="metadata"
          style={{ maxHeight: '500px' }}
        >
          Tu navegador no soporta videos.
        </video>
      </div>
    );
  }

  // Si no coincide con ningún formato conocido, mostrar botón para abrir en modal
  // Intentar detectar si es una URL válida aunque no sea reconocida
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (isValidUrl(videoUrl)) {
    // Si es una URL válida pero no reconocida, mostrar botón para abrir en modal
    return (
      <div className="w-full">
        <button
          onClick={() => onVideoClick && onVideoClick(videoUrl, title)}
          className="w-full p-4 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition flex items-center justify-center gap-2 font-semibold"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Ver Video
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Haz clic para abrir el video en una ventana emergente
        </p>
      </div>
    );
  }

  // Si no es una URL válida, mostrar mensaje de error
  return (
    <div className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-sm text-yellow-800">
        URL de video no válida. Por favor verifica que sea una URL válida de YouTube, Vimeo o un archivo MP4 directo.
      </p>
    </div>
  );
}
