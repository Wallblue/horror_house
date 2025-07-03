import { useState } from 'react'
import styles from '../css/Session.module.css'
import Button from './Button'

interface FoldableListProps<T> {
    elements: T[];
    getId: (item: T) => number;
    getButtonText: (item: T) => string;
    getText: (item: T) => string;
}

export interface FoldableListElement {
    id: number
    buttonText: string
    text: string
}

export default function FoldableList<T>({elements, getId, getButtonText, getText} : FoldableListProps<T>) {
    const [selected, setSelected] = useState<number | null>(null)

    return (<ul className={styles.list}>
        {elements.map(element => (
          <li key={getId(element)} className={styles.item}>
            <Button
              onClick={() => setSelected(getId(element))}
              type="button"
            >
              {getButtonText(element)}
            </Button>
            {selected === getId(element) && (
              <p className={styles.description}>{getText(element)}</p>
            )}
          </li>
        ))}
      </ul>)
}