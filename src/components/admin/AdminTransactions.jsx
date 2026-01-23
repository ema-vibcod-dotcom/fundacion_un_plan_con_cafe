import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiFetch } from '../../services/apiConfig';

export default function AdminTransactions() {
  const { translate, language } = useLanguage();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'donation', 'store_purchase'
  const [modeFilter, setModeFilter] = useState('all'); // 'all', 'test', 'live'
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const itemsPerPage = 20;

  useEffect(() => {
    loadTransactions();
  }, [filter, modeFilter]);

  const loadTransactions = async (startingAfter = null) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        filter: filter,
        mode: modeFilter,
        limit: '100', // Fetch more to allow client-side pagination
      });

      if (startingAfter) {
        params.append('starting_after', startingAfter);
      }

      const response = await apiFetch(`/api/transactions?${params.toString()}`);

      if (response.transactions) {
        if (startingAfter) {
          // Append to existing transactions for pagination
          setTransactions((prev) => [...prev, ...response.transactions]);
        } else {
          // Replace transactions when filter changes
          setTransactions(response.transactions);
        }
        setHasMore(response.has_more || false);
        setLastId(response.last_id || null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error loading transactions:', err);
      setError(err.message || 'Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setLastId(null);
  };

  const handleModeFilterChange = (newMode) => {
    setModeFilter(newMode);
    setCurrentPage(1);
    setLastId(null);
  };

  const handleLoadMore = () => {
    if (hasMore && lastId) {
      loadTransactions(lastId);
    }
  };

  // Paginación client-side
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'es' ? 'es-CO' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatAmount = (amount, currency = 'USD') => {
    return new Intl.NumberFormat(language === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getTransactionTypeLabel = (type) => {
    if (type === 'store_purchase') {
      return language === 'es' ? 'Compra' : 'Purchase';
    } else if (type === 'donation') {
      return language === 'es' ? 'Donación' : 'Donation';
    }
    return type;
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-amber-900">Cargando transacciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
        <button
          onClick={() => loadTransactions()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        {/* Filtro por tipo de transacción */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {language === 'es' ? 'Tipo de Transacción' : 'Transaction Type'}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'all'
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              {language === 'es' ? 'Todas' : 'All'}
            </button>
            <button
              onClick={() => handleFilterChange('donation')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'donation'
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              {language === 'es' ? 'Donaciones' : 'Donations'}
            </button>
            <button
              onClick={() => handleFilterChange('store_purchase')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'store_purchase'
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              {language === 'es' ? 'Compras' : 'Purchases'}
            </button>
          </div>
        </div>

        {/* Filtro por modo (prueba/real) */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {language === 'es' ? 'Modo' : 'Mode'}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleModeFilterChange('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                modeFilter === 'all'
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              {language === 'es' ? 'Todas' : 'All'}
            </button>
            <button
              onClick={() => handleModeFilterChange('live')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                modeFilter === 'live'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              {language === 'es' ? 'Reales' : 'Live'}
            </button>
            <button
              onClick={() => handleModeFilterChange('test')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                modeFilter === 'test'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-yellow-50'
              }`}
            >
              {language === 'es' ? 'Prueba' : 'Test'}
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            {language === 'es' ? 'Total' : 'Total'}
          </p>
          <p className="text-2xl font-bold text-amber-900">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            {language === 'es' ? 'Reales' : 'Live'}
          </p>
          <p className="text-2xl font-bold text-green-600">
            {transactions.filter((t) => t.is_test === false).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            {language === 'es' ? 'Prueba' : 'Test'}
          </p>
          <p className="text-2xl font-bold text-yellow-600">
            {transactions.filter((t) => t.is_test === true).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            {language === 'es' ? 'Donaciones' : 'Donations'}
          </p>
          <p className="text-2xl font-bold text-amber-900">
            {transactions.filter((t) => t.transaction_type === 'donation').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            {language === 'es' ? 'Compras' : 'Purchases'}
          </p>
          <p className="text-2xl font-bold text-amber-900">
            {transactions.filter((t) => t.transaction_type === 'store_purchase').length}
          </p>
        </div>
      </div>

      {/* Tabla de transacciones */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">
                  {language === 'es' ? 'Tipo' : 'Type'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">
                  {language === 'es' ? 'Donante/Cliente' : 'Donor/Client'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">
                  {language === 'es' ? 'Monto' : 'Amount'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider">
                  {language === 'es' ? 'Fecha y Hora' : 'Date & Time'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                    {language === 'es'
                      ? 'No se encontraron transacciones'
                      : 'No transactions found'}
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-amber-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.transaction_type === 'donation'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {getTransactionTypeLabel(transaction.transaction_type)}
                        </span>
                        {transaction.is_test && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {language === 'es' ? 'PRUEBA' : 'TEST'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.donor_name ? (
                        <span>{transaction.donor_name}</span>
                      ) : (
                        <span className="text-gray-500 italic">
                          {language === 'es' ? 'Anónimo' : 'Anonymous'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-amber-900">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'es' ? 'Anterior' : 'Previous'}
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'es' ? 'Siguiente' : 'Next'}
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  {language === 'es' ? 'Mostrando' : 'Showing'}{' '}
                  <span className="font-medium">{startIndex + 1}</span>{' '}
                  {language === 'es' ? 'a' : 'to'}{' '}
                  <span className="font-medium">
                    {Math.min(endIndex, transactions.length)}
                  </span>{' '}
                  {language === 'es' ? 'de' : 'of'}{' '}
                  <span className="font-medium">{transactions.length}</span>{' '}
                  {language === 'es' ? 'resultados' : 'results'}
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'es' ? 'Anterior' : 'Previous'}
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    {language === 'es' ? 'Página' : 'Page'} {currentPage} {language === 'es' ? 'de' : 'of'}{' '}
                    {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'es' ? 'Siguiente' : 'Next'}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Botón para cargar más si hay más datos en Stripe */}
        {hasMore && transactions.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition font-semibold"
            >
              {language === 'es' ? 'Cargar más transacciones' : 'Load more transactions'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
