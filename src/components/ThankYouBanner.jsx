import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ThankYouBanner({ transactionType, donorName, onClose }) {
  const { translate } = useLanguage();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Determinar el mensaje según el tipo de transacción
    if (transactionType === 'store_purchase') {
      setMessage(translate('success_thank_you_purchase'));
    } else if (transactionType === 'donation') {
      if (donorName && donorName.trim() && donorName.toLowerCase() !== 'anónimo' && donorName.toLowerCase() !== 'anonymous') {
        const messageTemplate = translate('success_thank_you_donation_named');
        setMessage(messageTemplate.replace('{name}', donorName.trim()));
      } else {
        setMessage(translate('success_thank_you_donation_anonymous'));
      }
    } else {
      setMessage(translate('success_thank_you_generic'));
    }

    // Auto-cerrar después de 8 segundos
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [transactionType, donorName, translate, onClose]);

  if (!transactionType) return null;

  return (
    <div className="fixed top-[64px] left-0 right-0 z-50 animate-slide-down">
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {/* Icono de éxito */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Mensaje */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold">
                  {message}
                </h3>
                <p className="text-sm md:text-base text-amber-100 mt-1">
                  {translate('success_payment_processed')}
                </p>
              </div>
            </div>

            {/* Botón cerrar */}
            {onClose && (
              <button
                onClick={onClose}
                className="ml-4 flex-shrink-0 p-2 hover:bg-white/20 rounded-full transition"
                aria-label="Cerrar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
