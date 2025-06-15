import { ReactNode } from 'react'
import styles from '../css/Form.module.css'

interface ButtonProps{
    type: "submit" | "reset" | "button" | undefined
    children: ReactNode
}

export default function Button({type, children} : ButtonProps) {
    return <button type={type} className={styles.button}>{children}</button>
}