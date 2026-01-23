import { useState } from 'react';

/**
 * Componente reutilizable para input de URL de video con validación
 * Acepta YouTube, Vimeo o URLs directas de MP4
 */
export default function VideoUrlInput({ value, onChange, label = 'URL de Video', required = false }) {
  const [videoUrl, setVideoUrl] = useState(value || '');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Validar que la URL sea de YouTube, Vimeo o MP4 directo
  const validateVideoUrl = (url) => {
    if (!url || url.trim() === '') {
      setIsValid(true);
      setErrorMessage('');
      return true; // URL vacía es válida (opcional)
    }

    try {
      // Verificar que sea una URL válida
      new URL(url);
      
      // Verificar si es YouTube
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;
      const isYouTube = youtubeRegex.test(url);
      
      // Verificar si es Vimeo
      const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/i;
      const isVimeo = vimeoRegex.test(url);
      
      // Verificar si es MP4 directo
      const mp4Regex = /\.mp4(\?.*)?$/i;
      const isMP4 = mp4Regex.test(url);
      
      if (isYouTube || isVimeo || isMP4) {
        setIsValid(true);
        setErrorMessage('');
        return true;
      } else {
        setIsValid(false);
        setErrorMessage('La URL debe ser de YouTube, Vimeo o un enlace directo a un archivo MP4');
        return false;
      }
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Por favor ingresa una URL válida');
      return false;
    }
  };

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);
    validateVideoUrl(newUrl);
    
    // Pasar el valor al componente padre
    if (onChange) {
      onChange(newUrl);
    }
  };

  const handleBlur = () => {
    validateVideoUrl(videoUrl);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="url"
        value={videoUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ej: https://youtube.com/watch?v=abc123 o https://vimeo.com/123456789"
        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none ${
          isValid ? 'border-gray-300' : 'border-red-500'
        }`}
      />
      <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
        Formatos soportados: YouTube, Vimeo o enlace directo a archivo MP4
      </p>
      {errorMessage && (
        <p className="mt-1 text-xs sm:text-sm text-red-600">{errorMessage}</p>
      )}
      {videoUrl && isValid && (
        <p className="mt-1.5 text-xs sm:text-sm text-green-600 font-medium">
          {videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? '✓ YouTube detectado' : ''}
          {videoUrl.includes('vimeo') ? '✓ Vimeo detectado' : ''}
          {videoUrl.includes('.mp4') ? '✓ MP4 directo detectado' : ''}
        </p>
      )}
    </div>
  );
}
