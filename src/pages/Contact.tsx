import { useState } from 'react'
import styles from '../css/Contact.module.css'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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