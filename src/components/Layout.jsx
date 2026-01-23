import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function Layout({ children }) {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si estamos en mobile y si hay algún problema
  useEffect(() => {
    // Detectar si es mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    if (isMobile) {
      // Si estamos en mobile y la ruta no es válida o hay algún problema,
      // verificar después de un breve delay si el contenido se renderizó
      const timer = setTimeout(() => {
        const mainContent = document.getElementById('main-content');
        // Si el contenido principal está vacío o tiene problemas, redirigir a home
        if (mainContent && mainContent.children.length === 0 && location.pathname !== '/') {
          console.warn('Contenido vacío detectado en mobile, redirigiendo a home');
          navigate('/', { replace: true });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col antialiased">
      {/* Skip to main content link (accesibilidad) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-900 focus:text-white focus:rounded-md"
      >
        {translate('skip_to_content')}
      </a>

      <Header />

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 sm:pb-24 md:pb-12"
      >
        {children}
      </main>

      <Navigation />
    </div>
  );
}
