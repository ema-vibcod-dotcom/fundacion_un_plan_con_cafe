import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, changeLanguage, translate } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
          language === 'es'
            ? 'bg-white text-amber-900 shadow-md'
            : 'bg-amber-800 text-white border-2 border-white hover:bg-amber-700'
        }`}
        aria-label={translate('change_to_spanish')}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-amber-900 shadow-md'
            : 'bg-amber-800 text-white border-2 border-white hover:bg-amber-700'
        }`}
        aria-label={translate('change_to_english')}
      >
        EN
      </button>
    </div>
  );
}
