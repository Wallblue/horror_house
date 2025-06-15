import { useState } from 'react'
import styles from '../css/Session.module.css'
import Button from './Button'

interface FoldableListProps {
    elements: FoldableListElement[]
}

export interface FoldableListElement {
    id: number
    buttonText: string
    text: string
}

export default function FoldableList({elements} : FoldableListProps) {
    const [selected, setSelected] = useState<number | null>(null)

    return (<ul className={styles.list}>
        {elements.map(element => (
          <li key={element.id} className={styles.item}>
            <Button
              onClick={() => setSelected(element.id)}
              type="button"
            >
              {element.buttonText}
            </Button>
            {selected === element.id && (
              <p className={styles.description}>{element.text}</p>
            )}
          </li>
        ))}
      </ul>)
}