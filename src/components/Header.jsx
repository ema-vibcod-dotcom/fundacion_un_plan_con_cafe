import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import logoFundacion from '../assets/logo-fundacion.png';

export default function Header() {
  const { translate } = useLanguage();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();
  
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
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* Carrito */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-amber-800 rounded-full transition"
              aria-label="Carrito de compras"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
