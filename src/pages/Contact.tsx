import { useState } from 'react'
import styles from '../css/Contact.module.css'

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
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom</label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label>Email</label><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label>Message</label><br />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={styles.textarea}
            />
          </div>
          <button type="submit" className={styles.button}>Envoyer</button>
        </form>
      )}
    </main>
  )
}