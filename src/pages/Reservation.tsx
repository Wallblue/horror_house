import { useState } from 'react'
import styles from '../css/Reservation.module.css'
import Button from '../components/Button'
import { FormFieldProps } from '../components/FormField'
import BookingForm from '../components/BookingForm'

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

  const fields : Field[] = [
    {label: 'Nom complet', type: 'text', name: 'name', value: formData.name}
  ]

  return (
    <main className={styles.main}>
      <h1>Réservation</h1>
      {submitted ? (
        <p>Merci pour votre réservation, {formData.name} ! Nous vous contacterons par email.</p>
      ) : (
        <BookingForm
          formdata={formData}
          setFormdata={setFormData}
          setSubmitted={setSubmitted}
        />
      )}
    </main>
  )
}

type Field = Omit<FormFieldProps, 'onChange'>