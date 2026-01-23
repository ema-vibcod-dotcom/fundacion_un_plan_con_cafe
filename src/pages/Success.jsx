import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

export default function Success() {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener parámetros de la URL
    const transactionType = searchParams.get('transaction_type');
    const donorName = searchParams.get('donor_name');

    // Limpiar el carrito si fue una compra
    if (transactionType === 'store_purchase') {
      clearCart();
    }

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
      // Si no hay tipo de transacción, mensaje genérico
      setMessage(translate('success_thank_you_generic'));
    }

    setIsLoading(false);
  }, [searchParams, clearCart, translate]);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="text-amber-900">{translate('success_loading')}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
        {/* Icono de éxito */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-600"
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

        {/* Mensaje de agradecimiento */}
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
          {message}
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          {translate('success_payment_processed')}
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition"
          >
            {translate('success_return_home')}
          </button>
          <button
            onClick={() => navigate('/store')}
            className="px-6 py-3 bg-white border-2 border-amber-900 text-amber-900 rounded-lg font-semibold hover:bg-amber-50 transition"
          >
            {translate('success_continue_shopping')}
          </button>
        </div>
      </div>
    </div>
  );
}
