/**
 * Componente para mostrar preview de video con thumbnail y botón de play
 * Al hacer click, abre el video en un modal
 */

export default function VideoPreview({ videoUrl, title, onPlayClick }) {
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

  // Obtener thumbnail según el tipo de video
  const getThumbnail = () => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = getYouTubeId(videoUrl);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    
    if (videoUrl.includes('vimeo.com')) {
      const videoId = getVimeoId(videoUrl);
      if (videoId) {
        // Vimeo requiere una llamada a su API, pero podemos usar un placeholder
        // o intentar con una URL estándar
        return `https://vumbnail.com/${videoId}.jpg`;
      }
    }

    // Para MP4, no hay thumbnail automático, usar un placeholder
    if (isMP4) {
      return null;
    }

    return null;
  };

  const thumbnail = getThumbnail();

  const handleClick = () => {
    if (onPlayClick) {
      onPlayClick(videoUrl, title);
    }
  };

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {/* Thumbnail o placeholder */}
      {thumbnail ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <img
            src={thumbnail}
            alt={title || 'Video preview'}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              // Si el thumbnail falla, mostrar placeholder
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-800 flex items-center justify-center">
                  <div class="text-center text-white">
                    <svg class="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <p class="text-sm font-semibold">${title || 'Video'}</p>
                  </div>
                </div>
              `;
            }}
          />
          {/* Overlay oscuro con título */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="w-full p-4 text-white">
              <p className="text-sm font-semibold">{title || 'Ver Video'}</p>
            </div>
          </div>
        </div>
      ) : (
        // Placeholder si no hay thumbnail
        <div className="relative w-full bg-gradient-to-br from-amber-900 to-amber-800" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition">
              <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold">{title || 'Ver Video'}</p>
          </div>
        </div>
      )}

      {/* Botón de play centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-transform">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
