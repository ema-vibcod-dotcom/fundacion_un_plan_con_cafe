import { useLanguage } from '../contexts/LanguageContext';

export default function Podcast() {
  const { translate } = useLanguage();

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 px-4 md:px-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4">
          {translate('podcast_page_title')}
        </h1>
      </div>

      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 text-center md:mb-12">
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
            {translate('podcast_coming_soon_title')}
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl">
            {translate('podcast_coming_soon_message')}
          </p>
        </div>
      </section>
    </div>
  );
}
