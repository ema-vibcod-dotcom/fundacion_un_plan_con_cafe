import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Donations from './pages/Donations';
import Store from './pages/Store';
import Podcast from './pages/Podcast';
import Projects from './pages/Projects';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donations />} />
              <Route path="/store" element={<Store />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Layout>
        </Router>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}

export default App;
