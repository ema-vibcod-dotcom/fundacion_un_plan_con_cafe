import { useLanguage } from '../contexts/LanguageContext';

export default function Projects() {
  const { translate } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">
          {translate('projects_title')}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm">
          {translate('projects_subtitle')}
        </p>
      </div>

      {/* Sección Bilingüismo */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-amber-900"
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
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4">
              {translate('bilingualism_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              {translate('bilingualism_description')}
            </p>
            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-amber-900 mb-2">
                {translate('bilingualism_impact_title')}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {translate('bilingualism_impact_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Aldonarte */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-amber-900"
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
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4">
              {translate('aldonarte_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm mb-6">
              {translate('aldonarte_description')}
            </p>

            {/* Modelo de fases */}
            <div className="space-y-4">
              {/* Fase 1: Equipar salón */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-l-4 border-amber-500">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-900 mb-2">
                      {translate('aldonarte_phase1_title')}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {translate('aldonarte_phase1_description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flecha */}
              <div className="flex justify-center">
                <svg
                  className="w-6 h-6 text-amber-500"
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
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-l-4 border-amber-500">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-900 mb-2">
                      {translate('aldonarte_phase2_title')}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {translate('aldonarte_phase2_description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flecha */}
              <div className="flex justify-center">
                <svg
                  className="w-6 h-6 text-amber-500"
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
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border-l-4 border-amber-500">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-900 mb-2">
                      {translate('aldonarte_phase3_title')}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
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
