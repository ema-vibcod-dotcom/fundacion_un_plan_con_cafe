import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex justify-center gap-3 mb-4">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          language === 'es'
            ? 'bg-amber-900 text-white shadow-md'
            : 'bg-white text-amber-900 border-2 border-amber-900 hover:bg-amber-50'
        }`}
      >
        Español
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          language === 'en'
            ? 'bg-amber-900 text-white shadow-md'
            : 'bg-white text-amber-900 border-2 border-amber-900 hover:bg-amber-50'
        }`}
      >
        English
      </button>
    </div>
  );
}
