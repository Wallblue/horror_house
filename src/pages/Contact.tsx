import {useState} from 'react'
import styles from '../css/App.module.css'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className={styles.form}>
      <h1>Contact</h1>
      {submitted ? (
        <p>Merci pour votre message, {formData.name} ! Nous vous répondrons rapidement.</p>
      ) : (
        <ContactForm formdata={formData} setFormdata={setFormData} setSubmitted={setSubmitted} />
      )}
    </div>
  )
}