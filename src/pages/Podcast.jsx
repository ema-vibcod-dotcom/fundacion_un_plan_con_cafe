import { podcastEpisodes, formatDate } from '../data/podcastEpisodes';
import { useLanguage } from '../contexts/LanguageContext';

export default function Podcast() {
  const { translate } = useLanguage();
  const sortedEpisodes = [...podcastEpisodes].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 px-4 md:px-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">{translate('podcast_title')}</h1>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm">
          {translate('podcast_subtitle')}
        </p>
      </div>

      {/* Lista de Episodios */}
      {sortedEpisodes.length > 0 ? (
        <div className="space-y-6">
          {sortedEpisodes.map(episode => (
            <article
              key={episode.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Información del episodio */}
              <div className="p-5 sm:p-6">
                {/* Título y fecha */}
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2">
                    {episode.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time dateTime={episode.created_at}>
                      {formatDate(episode.created_at)}
                    </time>
                  </div>
                </div>

                {/* Descripción */}
                {episode.description && (
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
                    {episode.description}
                  </p>
                )}

                {/* Reproductor de audio HTML5 */}
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <audio
                    controls
                    preload="metadata"
                    className="w-full h-12"
                    aria-label={`${translate('audio_player_label')} ${episode.title}`}
                  >
                    <source src={episode.audio_url} type="audio/mpeg" />
                    <source src={episode.audio_url} type="audio/ogg" />
                    <source src={episode.audio_url} type="audio/wav" />
                    <p className="text-sm text-gray-600">
                      {translate('browser_no_audio')}{' '}
                      <a
                        href={episode.audio_url}
                        className="text-amber-900 underline"
                        download
                      >
                        {translate('download_episode_here')}
                      </a>
                    </p>
                  </audio>

                  {/* Enlace de descarga alternativa */}
                  <div className="mt-3 flex items-center justify-between">
                    <a
                      href={episode.audio_url}
                      download
                      className="inline-flex items-center text-sm text-amber-900 hover:text-amber-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded px-3 py-1.5 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      {translate('download_episode')}
                    </a>
                    <span className="text-xs text-gray-500">{translate('episode_number')}{episode.id}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Mensaje cuando no hay episodios */
        <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {translate('no_episodes_title')}
          </h2>
          <p className="text-gray-600 text-sm">
            {translate('no_episodes_text')}
          </p>
        </div>
      )}

      {/* Información sobre el podcast */}
      <div className="bg-amber-50 rounded-xl p-6 sm:p-8 border-l-4 border-amber-500 md:mb-12">
        <h3 className="text-lg font-bold text-amber-900 mb-3">{translate('about_podcast_title')}</h3>
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p>
            {translate('about_podcast')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-semibold text-amber-900">{translate('podcast_regular')}</p>
                <p className="text-xs text-gray-600">{translate('podcast_regular_desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-amber-900">{translate('podcast_duration')}</p>
                <p className="text-xs text-gray-600">{translate('podcast_duration_desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-amber-900">{translate('podcast_stories')}</p>
                <p className="text-xs text-gray-600">{translate('podcast_stories_desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <div>
                <p className="font-semibold text-amber-900">{translate('podcast_free')}</p>
                <p className="text-xs text-gray-600">{translate('podcast_free_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
