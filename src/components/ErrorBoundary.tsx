import React, { Component, ReactNode } from 'react';
import styles from '../css/App.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorBoundary}>
          <h2>🎭 Quelque chose d'effrayant s'est produit...</h2>
          <p>
            Une erreur inattendue est survenue dans l'application. 
            Nos fantômes techniques travaillent à la résoudre !
          </p>
          <details className={styles.errorDetails}>
            <summary>Détails techniques</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button 
            className={styles.button}
            onClick={() => window.location.reload()}
          >
            🔄 Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
