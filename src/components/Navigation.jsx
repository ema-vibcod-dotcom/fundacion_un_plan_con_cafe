import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigation() {
  const location = useLocation();
  const { translate } = useLanguage();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItemClass = (path) => {
    const active = isActive(path);
    return `flex flex-col items-center justify-center flex-1 min-w-0 px-1 sm:px-2 ${
      active
        ? 'text-amber-900 bg-amber-50 font-semibold'
        : 'text-gray-600'
    } hover:text-amber-900 hover:bg-amber-50 active:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset transition-all duration-150`;
  };

  return (
    <nav
      role="navigation"
      aria-label={translate('nav_main')}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 safe-area-inset-bottom"
    >
      <div className="flex justify-around items-stretch h-16 max-w-7xl mx-auto">
        {/* Home */}
        <NavLink
          to="/"
          aria-label={translate('nav_home_label')}
          aria-current={isActive('/') ? 'page' : 'false'}
          className={navItemClass('/')}
        >
          <svg
            className="w-6 h-6 mb-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs font-medium truncate w-full text-center">{translate('nav_home')}</span>
        </NavLink>

        {/* Donate */}
        <NavLink
          to="/donate"
          aria-label={translate('nav_donate_label')}
          aria-current={isActive('/donate') ? 'page' : 'false'}
          className={navItemClass('/donate')}
        >
          <svg
            className="w-6 h-6 mb-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-xs font-medium truncate w-full text-center">{translate('nav_donate')}</span>
        </NavLink>

        {/* Store */}
        <NavLink
          to="/store"
          aria-label={translate('nav_store_label')}
          aria-current={isActive('/store') ? 'page' : 'false'}
          className={navItemClass('/store')}
        >
          <svg
            className="w-6 h-6 mb-0.5 flex-shrink-0"
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
          <span className="text-xs font-medium truncate w-full text-center">{translate('nav_store')}</span>
        </NavLink>

        {/* Learn */}
        <NavLink
          to="/learn"
          aria-label={translate('nav_learn_label')}
          aria-current={isActive('/learn') ? 'page' : 'false'}
          className={navItemClass('/learn')}
        >
          <svg
            className="w-6 h-6 mb-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-xs font-medium truncate w-full text-center">{translate('nav_learn')}</span>
        </NavLink>

        {/* Podcast */}
        <NavLink
          to="/podcast"
          aria-label={translate('nav_podcast_label')}
          aria-current={isActive('/podcast') ? 'page' : 'false'}
          className={navItemClass('/podcast')}
        >
          <svg
            className="w-6 h-6 mb-0.5 flex-shrink-0"
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
          <span className="text-xs font-medium truncate w-full text-center">{translate('nav_podcast')}</span>
        </NavLink>
      </div>
    </nav>
  );
}
