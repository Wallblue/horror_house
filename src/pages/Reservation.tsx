import { useState } from 'react'
import styles from '../css/Reservation.module.css'
import { FormFieldProps } from '../components/FormField'
import BookingForm from '../components/BookingForm'

export default function Reservation() {
  const [formData, setFormData] = useState({ name: '', email: '', session: '' })
  const [submitted, setSubmitted] = useState(false)

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