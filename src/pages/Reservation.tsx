import {useState} from 'react'
import styles from '../css/App.module.css'
import {FormFieldProps} from '../components/FormField'
import BookingForm from '../components/BookingForm'

export default function Reservation() {
  const [formData, setFormData] = useState({ name: '', email: '', session: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className={styles.form}>
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
    </div>
  )
}

type Field = Omit<FormFieldProps, 'onChange'>