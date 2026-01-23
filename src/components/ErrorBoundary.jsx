import { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    // Redirigir cuando se detecta un error
    if (this.state.hasError && !prevState.hasError && this.props.onRedirect) {
      // Usar setTimeout para asegurar que la redirección ocurra después del render
      setTimeout(() => {
        this.props.onRedirect('/');
      }, 100);
    }
  }

  render() {
    if (this.state.hasError) {
      // Redirigir inmediatamente sin mostrar mensaje
      if (this.props.onRedirect) {
        this.props.onRedirect('/');
      }
      // Retornar null mientras redirige
      return null;
    }

    return this.props.children;
  }
}

// Wrapper para usar hooks dentro del ErrorBoundary
export default function ErrorBoundary({ children }) {
  const navigate = useNavigate();
  
  return (
    <ErrorBoundaryClass onRedirect={navigate}>
      {children}
    </ErrorBoundaryClass>
  );
}
