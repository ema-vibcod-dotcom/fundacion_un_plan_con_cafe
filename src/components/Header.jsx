import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import logoFundacion from '../assets/logo-fundacion.png';

export default function Header() {
  const { translate } = useLanguage();
  
  return (
    <header role="banner" className="bg-amber-900 text-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex-1 flex items-center gap-3 justify-center sm:justify-start">
            <img 
              src={logoFundacion} 
              alt=""
              className="h-6 sm:h-8 object-contain"
            />
            <h1 className="text-lg sm:text-xl font-bold">
              {translate('foundation_name')}
            </h1>
          </div>
          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
