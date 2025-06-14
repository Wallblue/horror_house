import FormField, { FormFieldProps } from "./FormField"
import styles from '../css/Contact.module.css'

export interface ContactFormdata {
    name: string,
    email: string,
    message: string
}

interface ContactFormProps {
    formdata: ContactFormdata
    setFormdata: React.Dispatch<React.SetStateAction<ContactFormdata>>
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ContactForm({formdata, setFormdata, setSubmitted} : ContactFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const fields : Field[] = [
        {label: 'Nom', type: 'text', name: 'name', value: formdata.name},
        {label: 'Email', type: 'email', name: 'email', value: formdata.email},
        {label: 'Message', type: 'textarea', name: 'message', value: formdata.message, rows: 5}
    ]
    
    return (
        <form onSubmit={handleSubmit}>
            {fields.map( (field : Field) => (
                <FormField
                label={field.label}
                type={field.type}
                value={field.value}
                name={field.name}
                rows={field.rows}
                onChange={handleChange}
                />
            ))}
            <button type="submit" className={styles.button}>Envoyer</button>
        </form>
    )
}

type Field = Omit<FormFieldProps, 'onChange'>