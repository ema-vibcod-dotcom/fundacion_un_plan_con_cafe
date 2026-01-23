import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AdminProjects from '../components/admin/AdminProjects';
import AdminProducts from '../components/admin/AdminProducts';
import AdminPodcast from '../components/admin/AdminPodcast';
import AdminTransactions from '../components/admin/AdminTransactions';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');
  const { logout } = useAdminAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      {/* Header del Admin */}
      <header className="bg-amber-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {translate('admin_panel_title') || 'Panel de Administración'}
              </h1>
              <p className="text-sm text-amber-200 mt-1">
                {translate('admin_panel_subtitle') || 'Gestiona el contenido del sitio'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {translate('admin_logout_button') || 'Cerrar sesión'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 px-4 sm:px-6 py-4 text-center font-semibold transition ${
                activeTab === 'projects'
                  ? 'text-amber-900 border-b-2 border-amber-900 bg-amber-50'
                  : 'text-gray-600 hover:text-amber-900 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {translate('admin_tab_projects') || 'Proyectos'}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-4 sm:px-6 py-4 text-center font-semibold transition ${
                activeTab === 'products'
                  ? 'text-amber-900 border-b-2 border-amber-900 bg-amber-50'
                  : 'text-gray-600 hover:text-amber-900 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {translate('admin_tab_products') || 'Productos'}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('podcast')}
              className={`flex-1 px-4 sm:px-6 py-4 text-center font-semibold transition ${
                activeTab === 'podcast'
                  ? 'text-amber-900 border-b-2 border-amber-900 bg-amber-50'
                  : 'text-gray-600 hover:text-amber-900 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
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
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {translate('admin_tab_podcast') || 'Podcast'}
                </span>
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'projects' && <AdminProjects />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'podcast' && <AdminPodcast />}
            {activeTab === 'transactions' && <AdminTransactions />}
          </div>
        </div>
      </div>
    </div>
  );
}
