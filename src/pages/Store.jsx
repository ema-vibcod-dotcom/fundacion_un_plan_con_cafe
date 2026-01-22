import { products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';

function handlePurchase(productId, productName, price, translate) {
  const message =
    `${translate('store_purchase_thanks', { productName })} "${productName}"!\n\n` +
    `${translate('store_purchase_price')}: $${price.toFixed(2)} USD\n\n` +
    translate('store_purchase_simulation');

  alert(message);
  console.log('Compra simulada:', { productId, productName, price });
}

export default function Store() {
  const { translate } = useLanguage();
  const activeProducts = products.filter(p => p.active);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
          {translate('store_title')}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm">
          {translate('store_subtitle')}
        </p>
      </div>

      {activeProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activeProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={translate(`product_${product.id}_name`)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-amber-400"
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
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-lg font-bold text-amber-900 mb-2 line-clamp-2">
                  {translate(`product_${product.id}_name`)}
                </h2>

                {translate(`product_${product.id}_description`) ? (
                  <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
                    {translate(`product_${product.id}_description`)}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm mb-4 flex-grow italic">
                    {translate('product_default_description')}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-amber-900">
                        ${product.price_usd.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">USD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePurchase(product.id, translate(`product_${product.id}_name`), product.price_usd, translate)}
                    className="w-full bg-amber-900 text-white font-semibold px-4 py-3 rounded-lg hover:bg-amber-800 active:bg-amber-950 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {translate('buy_button')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">{translate('no_products_title')}</h2>
          <p className="text-gray-600 text-sm">
            {translate('no_products_text')}
          </p>
        </div>
      )}

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-lg mt-8">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5"
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
            <p className="font-semibold mb-1">{translate('store_info_title')}</p>
            <p className="text-amber-800 text-xs">
              {translate('store_info')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
