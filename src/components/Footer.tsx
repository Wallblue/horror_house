import styles from './Footer.module.css'
import LinkLister, { LinkItem } from './LinkLister'

export default function Footer() {

  const networkLinks : LinkItem[] = [
    {href: 'https://facebook.com/', title: 'Facebook'},
    {href: 'https://www.instagram.com/', title: 'Instagram'}
  ]

  const internalLinks : LinkItem[] = [
    {href: '/sessions', title: 'Sessions'},
    {href: '/mentions', title: 'Mention Légales'}
  ]

  const contactLinks : LinkItem[] = [
    {href: 'mailto:contact@lamaisonhorrifique.fr', title:'contact@lamaisonhorrifique.fr'},
    {href: 'tel:+33123456789', title:'01 23 45 67 89'},
    {href: '/contact', title: 'Formulaire de contact'}
  ]

  return (
    <footer className={styles.footer}>
      <LinkLister links={networkLinks} listTitle='Réseaux' />
      <LinkLister links={internalLinks} listTitle='Contenu' />
      <LinkLister links={contactLinks} listTitle='Contacts' />
    </footer>
  )
}