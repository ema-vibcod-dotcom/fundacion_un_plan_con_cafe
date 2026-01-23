import { useLanguage } from '../contexts/LanguageContext';

export default function Projects() {
  const { translate } = useLanguage();

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto space-y-6 px-4 md:px-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4">
          {translate('projects_title')}
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base px-2 md:px-4 max-w-2xl mx-auto">
          {translate('projects_subtitle')}
        </p>
      </div>

      {/* Sección Bilingüismo */}
      <section className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8">
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
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 mb-3 text-center sm:text-left">
              {translate('bilingualism_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
              {translate('bilingualism_description')}
            </p>
            <div className="bg-amber-50 rounded-lg p-4 md:p-5 border-l-4 border-amber-500">
              <h3 className="font-semibold text-amber-900 mb-2 text-sm md:text-base">
                {translate('bilingualism_impact_title')}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {translate('bilingualism_impact_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Aldonarte */}
      <section className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 mb-6 md:mb-12">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 mb-3 text-center sm:text-left">
              {translate('aldonarte_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-5">
              {translate('aldonarte_description')}
            </p>

            {/* Modelo de fases */}
            <div className="space-y-3">
              {/* Fase 1: Equipar salón */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 md:p-5 border-l-4 border-amber-500">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                      1
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-amber-900 mb-2 text-sm sm:text-base md:text-lg">
                      {translate('aldonarte_phase1_title')}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                      {translate('aldonarte_phase1_description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flecha */}
              <div className="flex justify-center py-1">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Fase 2: Entrega a Alcaldía */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 md:p-5 border-l-4 border-amber-500">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                      2
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-amber-900 mb-2 text-sm sm:text-base md:text-lg">
                      {translate('aldonarte_phase2_title')}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                      {translate('aldonarte_phase2_description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flecha */}
              <div className="flex justify-center py-1">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Fase 3: Continuidad */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 md:p-5 border-l-4 border-amber-500">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                      3
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-amber-900 mb-2 text-sm sm:text-base md:text-lg">
                      {translate('aldonarte_phase3_title')}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                      {translate('aldonarte_phase3_description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
