import { AppError } from '../hooks/useErrorHandler';
import styles from '../css/App.module.css';

interface ErrorAlertProps {
  errors: AppError[];
  onDismiss?: (index: number) => void;
  className?: string;
}

const getErrorIcon = (type: AppError['type']) => {
  switch (type) {
    case 'validation': return '⚠️';
    case 'network': return '🌐';
    case 'server': return '🔧';
    default: return '❌';
  }
};

const getErrorClass = (type: AppError['type']) => {
  switch (type) {
    case 'validation': return styles.errorValidation;
    case 'network': return styles.errorNetwork;
    case 'server': return styles.errorServer;
    default: return styles.errorUnknown;
  }
};

export default function ErrorAlert({ errors, onDismiss, className }: ErrorAlertProps) {
  if (errors.length === 0) return null;

  return (
    <div className={`${styles.errorAlertContainer} ${className || ''}`}>
      {errors.map((error, index) => (
        <div 
          key={index} 
          className={`${styles.errorAlert} ${getErrorClass(error.type)}`}
        >
          <div className={styles.errorContent}>
            <span className={styles.errorIcon}>
              {getErrorIcon(error.type)}
            </span>
            <div className={styles.errorText}>
              <strong>{error.field ? `${error.field}: ` : ''}</strong>
              {error.message}
            </div>
          </div>
          {onDismiss && (
            <button
              className={styles.errorDismiss}
              onClick={() => onDismiss(index)}
              aria-label="Fermer l'erreur"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
