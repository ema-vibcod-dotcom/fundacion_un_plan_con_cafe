import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { translate } = useLanguage();
  
  return (
    <header role="banner" className="bg-amber-900 text-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4 flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-bold flex-1 text-center sm:text-left">
            {translate('foundation_name')}
          </h1>
          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
