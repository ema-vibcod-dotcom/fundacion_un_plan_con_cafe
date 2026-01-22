import { createContext, useContext, useState, useEffect } from 'react';
import { translate as translateHelper } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Obtener idioma del localStorage o usar español por defecto
    return localStorage.getItem('language') || 'es';
  });

  useEffect(() => {
    // Guardar idioma en localStorage cuando cambie
    localStorage.setItem('language', language);
  }, [language]);

  const translate = (key, params = {}) => {
    return translateHelper(key, language, params);
  };

  const changeLanguage = (lang) => {
    if (lang === 'es' || lang === 'en') {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translate, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
