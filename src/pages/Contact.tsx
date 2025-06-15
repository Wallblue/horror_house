import { useState } from 'react'
import styles from '../css/Contact.module.css'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className={styles.main}>
      <h1>Contact</h1>
      {submitted ? (
        <p>Merci pour votre message, {formData.name} ! Nous vous répondrons rapidement.</p>
      ) : (
        <ContactForm formdata={formData} setFormdata={setFormData} setSubmitted={setSubmitted} />
      )}
    </main>
  )
}