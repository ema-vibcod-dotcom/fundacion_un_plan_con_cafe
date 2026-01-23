import { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    // Redirigir a home en caso de error
    if (this.props.onRedirect) {
      this.props.onRedirect('/');
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-amber-900 mb-4">Redirigiendo a la página principal...</p>
          </div>
        </div>
      );
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
