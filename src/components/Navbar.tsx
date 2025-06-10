import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/sessions', label: 'Sessions' },
    { to: '/reservation', label: 'Réservation' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <nav className={styles.nav}>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`${styles.link} \${location.pathname === to ? styles.linkActive : ''}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}