import { Link } from 'react-router-dom'
import NavbarElement from './NavbarElement'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <NavbarElement url='/' title='Accueil'/>
        <NavbarElement url='/sessions' title='Sessions'/>
        <NavbarElement url='/reservation' title='Réservations'/>
        <NavbarElement url='/contact' title='Contact'/>
      </ul>
    </nav>
  )
}