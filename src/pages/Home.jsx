import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import logoFundacion from '../assets/logo-fundacion.png';

export default function Home() {
  const { translate } = useLanguage();

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Logo Section */}
      <div className="flex justify-center py-2">
        <img 
          src={logoFundacion} 
          alt={translate('foundation_name')}
          className="h-12 sm:h-14 object-contain"
        />
      </div>

      <section className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
        <div className="text-center space-y-4">
          <p className="text-sm sm:text-base text-amber-200 font-medium">
            {translate('hero_subtitle')}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {translate('hero_title')}
          </h1>
          <p className="text-base sm:text-lg text-amber-100 leading-relaxed">
            {translate('hero_description')}
          </p>
          <div className="pt-4">
            <Link
              to="/donate"
              className="inline-block bg-white text-amber-900 font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-amber-50 active:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              {translate('donate_button')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start space-x-4">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              {translate('impact_title')}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              {translate('impact_description', { count: 500 })}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-amber-900">500+</div>
                <div className="text-xs text-gray-600">{translate('families')}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-amber-900">15</div>
                <div className="text-xs text-gray-600">{translate('communities')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start space-x-4">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              {translate('products_title')}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              {translate('products_description')}
            </p>
            <Link
              to="/store"
              className="inline-block text-amber-900 font-semibold hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded px-4 py-2 transition-colors text-sm"
            >
              {translate('view_products')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start space-x-4">
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
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              {translate('podcast_title')}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              {translate('podcast_description')}
            </p>
            <Link
              to="/podcast"
              className="inline-block text-amber-900 font-semibold hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded px-4 py-2 transition-colors text-sm"
            >
              {translate('listen_podcast')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 rounded-xl p-6 text-center border-2 border-amber-200">
        <h2 className="text-xl font-bold text-amber-900 mb-3">
          {translate('cta_title')}
        </h2>
        <p className="text-gray-700 mb-6 text-sm">{translate('cta_description')}</p>
        <Link
          to="/donate"
          className="inline-block bg-amber-900 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-amber-800 active:bg-amber-950 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-200 w-full sm:w-auto"
        >
          {translate('donate_now')}
        </Link>
      </section>
    </div>
  );
}
