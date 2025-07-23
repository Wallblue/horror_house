import { ReactNode } from 'react'
import styles from '../css/App.module.css'

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined
    onClick?: () => void
    children: ReactNode
    disabled?: boolean
}

export default function Button({ type, children, onClick, disabled }: ButtonProps) {
    return (<button
        type={type}
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>)
}