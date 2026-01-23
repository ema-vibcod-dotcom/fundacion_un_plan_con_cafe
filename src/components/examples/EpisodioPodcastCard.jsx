/**
 * Ejemplo de componente para mostrar un episodio del podcast
 * Este es un ejemplo de cómo consumir datos de Strapi
 */

import { useState, useEffect } from 'react';
import { getEpisodioById, getUrlPlataforma } from '../../services/podcastService';

export default function EpisodioPodcastCard({ episodioId }) {
  const [episodio, setEpisodio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEpisodio() {
      try {
        setLoading(true);
        const data = await getEpisodioById(episodioId);
        setEpisodio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (episodioId) {
      loadEpisodio();
    }
  }, [episodioId]);

  if (loading) {
    return <div className="text-amber-900">Cargando episodio...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!episodio) {
    return <div>Episodio no encontrado</div>;
  }

  const { attributes } = episodio;
  const urlPrincipal = getUrlPlataforma(episodio, 'spotify');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Imagen de portada */}
      {attributes.imagenPortada && (
        <img
          src={attributes.imagenPortada.url}
          alt={attributes.titulo}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-6">
        {/* Número de episodio */}
        {attributes.numeroEpisodio && (
          <span className="text-xs text-amber-700 uppercase tracking-wide">
            Episodio #{attributes.numeroEpisodio}
          </span>
        )}

        {/* Título */}
        <h3 className="text-2xl font-bold text-amber-900 mt-2 mb-2">
          {attributes.titulo}
        </h3>

        {/* Fecha */}
        <p className="text-sm text-gray-500 mb-4">
          {new Date(attributes.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Descripción */}
        {attributes.descripcion && (
          <div
            className="text-gray-600 mb-6 line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: attributes.descripcion.substring(0, 300) + '...',
            }}
          />
        )}

        {/* Botones de plataformas */}
        <div className="flex flex-wrap gap-3">
          {attributes.urlSpotify && (
            <a
              href={attributes.urlSpotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </a>
          )}

          {attributes.urlApplePodcast && (
            <a
              href={attributes.urlApplePodcast}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 19c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm0-11.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z" />
              </svg>
              Apple Podcast
            </a>
          )}

          {attributes.urlYoutube && (
            <a
              href={attributes.urlYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
          )}
        </div>

        {/* Botón principal (usar la primera plataforma disponible) */}
        {urlPrincipal && (
          <a
            href={urlPrincipal}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 bg-amber-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-amber-800 transition"
          >
            Escuchar Episodio
          </a>
        )}
      </div>
    </div>
  );
}
