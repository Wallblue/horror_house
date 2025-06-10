import { useState } from 'react'
import styles from '../css/Reservation.module.css'

export default function Reservation() {
  const [formData, setFormData] = useState({ name: '', email: '', session: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className={styles.main}>
      <h1>Réservation</h1>
      {submitted ? (
        <p>Merci pour votre réservation, {formData.name} ! Nous vous contacterons par email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom complet</label><br />
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
            <label>Session</label><br />
            <select
              name="session"
              value={formData.session}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">-- Choisissez une session --</option>
              <option value="Le Manoir Hanté">Le Manoir Hanté</option>
              <option value="L’Asile Abandonné">L’Asile Abandonné</option>
              <option value="La Crypte Maudite">La Crypte Maudite</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>Réserver</button>
        </form>
      )}
    </main>
  )
}