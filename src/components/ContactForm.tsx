import { Field } from "./FormField"
import Form from "./Form"

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
    const fields : Field[] = [
        {label: 'Nom', type: 'text', name: 'name', value: formdata.name},
        {label: 'Email', type: 'email', name: 'email', value: formdata.email},
        {label: 'Message', type: 'textarea', name: 'message', value: formdata.message, rows: 5}
    ]
    
    return (
        <Form<ContactFormdata>
            formdata={formdata}
            setFormdata={setFormdata}
            setSubmitted={setSubmitted}
            fields={fields}
            submitText="Envoyer"
        />
    )
}