import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const handleCheckout = () => {
    // Aquí se integraría con Stripe
    // Por ahora, redirigimos a la página de donaciones que ya existe
    // TODO: Implementar integración con Stripe
    alert('Funcionalidad de checkout con Stripe pendiente de implementar');
    // navigate('/checkout');
  };

  // Obtener imagen del producto
  const getProductImage = (product) => {
    const { attributes } = product;
    if (attributes?.imageUrl || attributes?.image_url) {
      return attributes.imageUrl || attributes.image_url;
    }
    if (attributes?.galeriaImagenes && attributes.galeriaImagenes.length > 0) {
      return typeof attributes.galeriaImagenes[0] === 'string'
        ? attributes.galeriaImagenes[0]
        : attributes.galeriaImagenes[0].url;
    }
    return null;
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
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
          </div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Agrega productos desde la tienda</p>
          <button
            onClick={() => navigate('/store')}
            className="px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition"
          >
            Ir a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-amber-900">Carrito de Compras</h1>
        <button
          onClick={() => navigate('/store')}
          className="text-amber-900 hover:text-amber-800 transition"
        >
          Continuar comprando
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const imageUrl = getProductImage(item);
            const price = item.attributes?.precio || item.precio || 0;
            const itemTotal = price * item.quantity;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Imagen */}
                {imageUrl && (
                  <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.attributes?.nombre || item.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Información */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900 mb-1">
                    {item.attributes?.nombre || item.nombre}
                  </h3>
                  {item.attributes?.nombreCreador && (
                    <p className="text-sm text-gray-500 mb-2">
                      Por {item.attributes.nombreCreador}
                    </p>
                  )}
                  <p className="text-lg font-bold text-amber-900">
                    ${price.toFixed(2)} USD
                  </p>
                </div>

                {/* Controles */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                  {/* Cantidad */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Total del item */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-amber-900">
                      ${itemTotal.toFixed(2)} USD
                    </p>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                    aria-label="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Botón limpiar carrito */}
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Limpiar carrito
          </button>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-amber-900 mb-4">Resumen</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'})</span>
                <span>${getTotalPrice().toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>Calculado en checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-amber-900">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition mb-3"
            >
              Proceder al Checkout
            </button>

            <p className="text-xs text-gray-500 text-center">
              Al proceder, serás redirigido al proceso de pago seguro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
