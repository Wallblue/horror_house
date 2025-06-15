import { ReactNode } from 'react'
import styles from '../css/Form.module.css'

interface ButtonProps{
    type: "submit" | "reset" | "button" | undefined
    onClick?: () => void
    children: ReactNode
}

export default function Button({type, children, onClick} : ButtonProps) {
    return (<button
        type={type}
        className={styles.button}
        onClick={onClick}
    >
        {children}
    </button>)
}