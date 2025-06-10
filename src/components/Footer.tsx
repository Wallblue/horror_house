import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <ul>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Instagram</a></li>
        <li><Link to="/sessions">Sessions</Link></li>
        <li><Link to="/mentions">Mentions légales</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </footer>
  )
}