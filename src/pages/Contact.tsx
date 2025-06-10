import { useState } from 'react'

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
    <main style={{ maxWidth: '32rem', margin: '2rem auto', padding: '0 1rem' }}>
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
            <label>Message</label><br />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Envoyer</button>
        </form>
      )}
    </main>
  )
}