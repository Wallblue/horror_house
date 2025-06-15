import Button from "./Button"
import FormField, { Field } from "./FormField"

interface FormProps<T> {
    formdata: T
    setFormdata: React.Dispatch<React.SetStateAction<T>>
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    fields: Field[]
    submitText: string
}

export default function Form<T>({formdata, setFormdata, setSubmitted, fields, submitText} : FormProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            {fields.map( (field : Field) => (
                <FormField
                {...field}
                onChange={handleChange}
                />
            ))}
            <Button type="submit">{submitText}</Button>
        </form>
    )
}

