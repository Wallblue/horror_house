import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import LinkLister, { LinkItem } from './LinkLister'

export default function Footer() {

  const networkLinks : LinkItem[] = [
    {href: 'https://facebook.com/', title: 'Facebook'},
    {href: 'https://www.instagram.com/', title: 'Instagram'}
  ]

  const internalLinks : LinkItem[] = [
    {href: '/sessions', title: 'Sessions'},
    {href: '/mentions', title: 'Mention Légales'},
    {href: '/contact', title: 'Contact'}
  ]

  return (
    <footer className={styles.footer}>
      <LinkLister links={networkLinks} />
      <LinkLister links={internalLinks} />
    </footer>
  )
}