import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.listItem}><a href="#" className={styles.link}>Facebook</a></li>
        <li className={styles.listItem}><a href="#" className={styles.link}>Instagram</a></li>
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItem}><Link to="/sessions" className={styles.link}>Sessions</Link></li>
        <li className={styles.listItem}><Link to="/mentions" className={styles.link}>Mentions légales</Link></li>
        <li className={styles.listItem}><Link to="/contact" className={styles.link}>Contact</Link></li>
      </ul>
    </footer>
  )
}