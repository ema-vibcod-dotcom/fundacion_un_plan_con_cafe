import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !videoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-amber-900 text-white">
          <h3 className="text-lg font-semibold">{title || 'Video del Producto'}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-800 rounded-full transition"
            aria-label="Cerrar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video Content - Embed completo */}
        <div className="p-4 bg-gray-50">
          <VideoPlayer videoUrl={videoUrl} title={title} />
        </div>
      </div>
    </div>
  );
}
