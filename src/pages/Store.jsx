import { useLanguage } from '../contexts/LanguageContext';

export default function Store() {
  const { translate } = useLanguage();

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 px-4 md:px-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-2 md:mb-3">
          {translate('store_title')}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
          {translate('store_subtitle')}
        </p>
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
            {translate('store_coming_soon_title')}
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl">
            {translate('store_coming_soon_message')}
          </p>
        </div>
      </section>
    </div>
  );
}
