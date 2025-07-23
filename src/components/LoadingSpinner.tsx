import styles from '../css/App.module.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ 
  message = 'Chargement...', 
  size = 'medium' 
}: LoadingSpinnerProps) {
  return (
    <div className={`${styles.loadingContainer} ${styles[`loading-${size}`]}`}>
      <div className={styles.spinner}>
        <div className={styles.spinnerInner}></div>
      </div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
}
