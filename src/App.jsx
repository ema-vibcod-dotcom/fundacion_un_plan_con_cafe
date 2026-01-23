import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Layout from './components/Layout';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Home from './pages/Home';
import Donations from './pages/Donations';
import Store from './pages/Store';
import Podcast from './pages/Podcast';
import Projects from './pages/Projects';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <Router>
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
                    <Route path="/podcast" element={<Podcast />} />
                    <Route path="/projects" element={<Projects />} />
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
        </Router>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}

export default App;
