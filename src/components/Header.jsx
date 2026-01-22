import LanguageSelector from './LanguageSelector';

export default function Header() {
  return (
    <header role="banner" className="bg-amber-900 text-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4 relative">
          <h1 className="text-lg sm:text-xl font-bold text-center">
            Fundación Un Plan con Café
          </h1>
          <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
