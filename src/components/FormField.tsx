import { ChangeEventHandler, JSX } from "react"
import styles from '../css/Form.module.css'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local'
  | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number'
  | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit'
  | 'tel' | 'text' | 'time' | 'url' | 'week'

interface CommonProps{
    label: string
    name: string
    value: string
    required?: boolean
}

type InputProps = CommonProps & {
    type: InputType
    onChange: ChangeEventHandler<HTMLInputElement>
}

type TextareaProps = CommonProps & {
    type: 'textarea'
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    rows?: number
}

type SelectProps = CommonProps & {
    type: 'select'
    onChange: ChangeEventHandler<HTMLSelectElement>
    options: Option[]
}

export type FormFieldProps = InputProps | TextareaProps | SelectProps

export interface Option{
    value: string
    text: string
}

export type Field = Omit<InputProps, 'onChange'>
  | Omit<TextareaProps, 'onChange'>
  | Omit<SelectProps, 'onChange'>

export default function FormField(props : FormFieldProps) {
    const { label, name, value, required } = props
    let field : JSX.Element;

    switch(props.type){
        case 'textarea':
            field = (<textarea
                    name={name}
                    value={value}
                    onChange={props.onChange}
                    rows={props.rows}
                    required={required === undefined ? true : required}
                    className={styles.textarea}
                />)
            break;
        case 'select':
            field = (<select
                    name={name}
                    value={value}
                    onChange={props.onChange}
                    required={required === undefined ? true : required}
                    className={styles.input}>
                        {props.options.map((option : Option) => <option value={option.value}>{option.text}</option>)}
                </select>)
            break;
        default:
            field = (<input
                    type={props.type}
                    name={name}
                    value={value}
                    onChange={props.onChange}
                    required={required === undefined ? true : required}
                    className={styles.input}
                />)
    }
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {field}
        </div>
    )
}