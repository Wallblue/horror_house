import { ChangeEventHandler } from "react"
import styles from '../css/Contact.module.css'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local'
  | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number'
  | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit'
  | 'tel' | 'text' | 'time' | 'url' | 'week'

export interface FormFieldProps {
    label: string
    name: string
    type: InputType | 'textarea'
    value: string
    onChange: ChangeEventHandler<HTMLTextAreaElement|HTMLInputElement>
    required?: boolean,
    rows?: number
}

export default function FormField({label, name, type, value, onChange, required, rows} : FormFieldProps) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                required={required === undefined ? true : required}
                className={styles.textarea}
                />
            ) : (
                <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required === undefined ? true : required}
                className={styles.input}
                />
            )}
        </div>
    )
}