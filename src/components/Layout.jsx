import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function Layout({ children }) {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si estamos en mobile y si hay algún problema (solo para rutas inválidas)
  useEffect(() => {
    // Detectar si es mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    if (isMobile) {
      // Solo verificar si estamos en una ruta que no debería estar vacía
      // Las rutas válidas son: /, /donate, /store, /product/:id, /cart, /podcast, /projects
      const validRoutes = ['/', '/donate', '/store', '/cart', '/podcast', '/projects'];
      const isProductRoute = location.pathname.startsWith('/product/');
      const isValidRoute = validRoutes.includes(location.pathname) || isProductRoute;

      if (!isValidRoute) {
        // Si la ruta no es válida, redirigir inmediatamente a home
        console.warn('Ruta inválida detectada en mobile, redirigiendo a home');
        navigate('/', { replace: true });
        return;
      }

      // Solo verificar contenido vacío para rutas válidas después de un delay más largo
      // Esto da tiempo a que el contenido se cargue
      const timer = setTimeout(() => {
        const mainContent = document.getElementById('main-content');
        // Solo redirigir si el contenido está completamente vacío (sin ningún elemento)
        // y no estamos en home
        if (
          mainContent && 
          mainContent.children.length === 0 && 
          location.pathname !== '/' &&
          !mainContent.textContent?.trim()
        ) {
          console.warn('Contenido vacío detectado en mobile después de timeout, redirigiendo a home');
          navigate('/', { replace: true });
        }
      }, 3000); // Aumentado a 3 segundos para dar más tiempo

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
