import { useState } from 'react'

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
    <main style={{ maxWidth: '32rem', margin: '2rem auto', padding: '0 1rem' }}>
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
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
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
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </div>
          <div>
            <label>Session</label><br />
            <select
              name="session"
              value={formData.session}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            >
              <option value="">-- Choisissez une session --</option>
              <option value="Le Manoir Hanté">Le Manoir Hanté</option>
              <option value="L’Asile Abandonné">L’Asile Abandonné</option>
              <option value="La Crypte Maudite">La Crypte Maudite</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Réserver</button>
        </form>
      )}
    </main>
  )
}