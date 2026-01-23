import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Donations from './pages/Donations';
import Store from './pages/Store';
import ProductStory from './pages/ProductStory';
import Cart from './pages/Cart';
import Podcast from './pages/Podcast';
import Projects from './pages/Projects';
import Success from './pages/Success';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <CartProvider>
          <Router>
            <ErrorBoundary>
              <Routes>
                {/* Rutas públicas con Layout */}
                <Route
                  path="/*"
                  element={
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/donate" element={<Donations />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/product/:id" element={<ProductStory />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/podcast" element={<Podcast />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/success" element={<Success />} />
                        {/* Ruta catch-all: redirigir cualquier ruta no reconocida a home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Layout>
                  }
                />
                {/* Rutas de administración sin Layout */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminPanel />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </ErrorBoundary>
          </Router>
        </CartProvider>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}

export default App;
