import { Link } from 'react-router-dom';
import styles from '../css/App.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.notFoundTitle}>👻 404</h1>
        <h2 className={styles.notFoundSubtitle}>Page Introuvable</h2>
        
        <div className={styles.notFoundMessage}>
          <p>🕯️ Cette page s'est volatilisée dans les ténèbres...</p>
          <p>Nos fantômes l'ont peut-être emportée dans l'au-delà !</p>
        </div>

        <div className={styles.notFoundActions}>
          <Link to="/" className={styles.notFoundButton}>
            🏠 Retour à l'accueil
          </Link>
          <Link to="/sessions" className={styles.notFoundButton}>
            🎭 Voir nos sessions
          </Link>
        </div>

        <div className={styles.notFoundFooter}>
          <p>
            Si vous pensez qu'il s'agit d'une erreur, 
            <Link to="/contact" className={styles.notFoundLink}> contactez-nous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
