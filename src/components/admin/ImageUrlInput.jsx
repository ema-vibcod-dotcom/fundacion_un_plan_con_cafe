import { useState } from 'react';

/**
 * Componente reutilizable para input de URL de imagen con validación y preview
 */
export default function ImageUrlInput({ value, onChange, label = 'URL de Imagen', required = false }) {
  const [imageUrl, setImageUrl] = useState(value || '');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Validar que la URL sea una imagen válida (jpg, jpeg, png, webp)
  // Soporta URLs de Google Imágenes y otros servicios con parámetros
  const validateImageUrl = (url) => {
    if (!url || url.trim() === '') {
      setIsValid(true);
      setErrorMessage('');
      return true; // URL vacía es válida (opcional)
    }

    try {
      // Verificar que sea una URL válida
      const urlObj = new URL(url);
      
      // URLs de Google Imágenes (googleusercontent.com, gstatic.com)
      const isGoogleImage = urlObj.hostname.includes('googleusercontent.com') || 
                           urlObj.hostname.includes('gstatic.com') ||
                           urlObj.hostname.includes('google.com');
      
      // Verificar extensión de imagen en la URL
      const imageExtensions = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i;
      const hasImageExtension = imageExtensions.test(url);
      
      // Si es Google Imágenes o tiene extensión de imagen, es válida
      if (isGoogleImage || hasImageExtension) {
        setIsValid(true);
        setErrorMessage('');
        return true;
      }
      
      // Si no tiene extensión pero parece una URL de imagen (contiene parámetros comunes)
      // Permitimos URLs que puedan ser imágenes pero sin extensión visible
      const commonImageParams = /[?&](url|image|img|photo|picture|src)=/i;
      if (commonImageParams.test(url)) {
        setIsValid(true);
        setErrorMessage('');
        return true;
      }
      
      setIsValid(false);
      setErrorMessage('La URL debe ser una imagen válida (jpg, jpeg, png, webp) o una URL de Google Imágenes');
      return false;
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Por favor ingresa una URL válida');
      return false;
    }
  };

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setImageUrl(newUrl);
    validateImageUrl(newUrl);
    
    // Pasar el valor al componente padre
    if (onChange) {
      onChange(newUrl);
    }
  };

  const handleBlur = () => {
    validateImageUrl(imageUrl);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="url"
        value={imageUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ej: https://ejemplo.com/imagen.jpg o https://cdn.ejemplo.com/foto.png"
        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none ${
          isValid ? 'border-gray-300' : 'border-red-500'
        }`}
      />
      <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
        Formatos soportados: JPG, JPEG, PNG, WEBP. También puedes pegar URLs de Google Imágenes directamente.
      </p>
      {errorMessage && (
        <p className="mt-1 text-xs sm:text-sm text-red-600">{errorMessage}</p>
      )}
      {imageUrl && isValid && (
        <div className="mt-3">
          <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">Vista previa:</p>
          <div className="border border-gray-300 rounded-lg p-2 sm:p-3 bg-gray-50">
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-full h-auto max-h-32 sm:max-h-48 rounded-lg mx-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                setIsValid(false);
                setErrorMessage('No se pudo cargar la imagen. Verifica que la URL sea accesible.');
              }}
              onLoad={() => {
                setIsValid(true);
                setErrorMessage('');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
