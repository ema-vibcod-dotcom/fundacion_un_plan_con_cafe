import Header from './Header';
import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col antialiased">
      {/* Skip to main content link (accesibilidad) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-900 focus:text-white focus:rounded-md"
      >
        Saltar al contenido principal
      </a>

      <Header />

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 sm:pb-24 md:pb-8"
      >
        {children}
      </main>

      <Navigation />
    </div>
  );
}
