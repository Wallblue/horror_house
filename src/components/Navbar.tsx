import { Link, useLocation } from 'react-router-dom'
import styles from '../css/Navbar.module.css'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/reservation', label: 'Réservation' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const location = useLocation()
  return (
    <nav className={styles.nav}>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`${styles.link} ${location.pathname === to ? styles.linkActive : ''}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}