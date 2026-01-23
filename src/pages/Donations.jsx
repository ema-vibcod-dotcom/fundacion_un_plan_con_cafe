import { useState } from 'react';
import FlashMessage from '../components/FlashMessage';
import { useLanguage } from '../contexts/LanguageContext';
import { apiFetch } from '../services/apiConfig';

export default function Donations() {
  const { translate, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    amount: ''
  });
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (flashMessage) {
      setFlashMessage(null);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.amount) {
      errors.push(translate('error_amount_required'));
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        errors.push(translate('error_amount_zero'));
      } else if (amount < 1) {
        errors.push(translate('error_amount_minimum'));
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlashMessage(null);
    setError(null);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setFlashType('error');
      setFlashMessage(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const amount = parseFloat(formData.amount);

      if (!amount || amount <= 0) {
        throw new Error('El monto debe ser mayor a 0');
      }

      console.log('Enviando donación al checkout:', { amount });

      // Enviar donación al endpoint de checkout
      const response = await apiFetch('/api/checkout/donation', {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });

      console.log('Respuesta del checkout:', response);

      // Si la respuesta tiene una URL, redirigir a Stripe Checkout
      if (response && response.url) {
        console.log('Redirigiendo a Stripe:', response.url);
        window.location.href = response.url;
      } else {
        console.error('Respuesta sin URL:', response);
        throw new Error('No se recibió la URL de checkout');
      }
    } catch (error) {
      console.error('Error en checkout de donación:', error);
      setError(error.message || translate('error_donation_processing'));
      setFlashType('error');
      setFlashMessage(error.message || translate('error_donation_processing'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto space-y-6 px-4 md:px-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
          {translate('donations_title')}
        </h1>
        <p className="text-gray-700 text-sm">
          {translate('donations_subtitle')}
        </p>
      </div>

      {flashMessage && (
        <FlashMessage
          message={flashMessage}
          type={flashType}
          onClose={() => setFlashMessage(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-5 md:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            {translate('name_label')} <span className="text-gray-500 text-xs">({translate('name_optional')})</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength="100"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-base"
            placeholder={translate('name_placeholder')}
          />
          <p className="mt-1 text-xs text-gray-500">
            {translate('name_hint')}
          </p>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
            {translate('amount_label')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-semibold">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              className="w-full pl-8 pr-16 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-base"
              placeholder="0.00"
              aria-required="true"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-semibold text-sm">USD</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            <span className="font-semibold">{translate('amount_note')}</span> {translate('amount_info')}
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">{translate('important_info')}</p>
              <p className="text-amber-800 text-xs">
                {translate('donation_info')}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-900 text-white font-bold text-lg px-6 py-4 rounded-lg shadow-lg hover:bg-amber-800 active:bg-amber-950 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? translate('processing') : translate('donate_button_text')}
        </button>

        <p className="text-xs text-center text-gray-500">
          {translate('donation_confirm')}
        </p>
      </form>

      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 md:mb-12">
        <h2 className="text-lg md:text-xl font-bold text-amber-900 mb-3 md:mb-4">
          {translate('donations_usage_title')}
        </h2>
        <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translate('usage_1')}</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translate('usage_2')}</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translate('usage_3')}</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{translate('usage_4')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
