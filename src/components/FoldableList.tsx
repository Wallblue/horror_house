import {useState} from 'react';
import styles from '../css/App.module.css';
import Button from './Button';

interface FoldableListProps<T> {
    elements: T[];
    getId: (item: T) => number;
    getButtonText: (item: T) => string;
    getText: (item: T) => string;
}

export default function FoldableList<T>({elements, getId, getButtonText, getText} : FoldableListProps<T>) {
    const [selected, setSelected] = useState<number | null>(null);

    const select = (id: number) => {
      selected === id ? setSelected(null) : setSelected(id);
    };

    return (<ul className={styles.foldableList}>
        {elements.map(element => (
          <li key={getId(element)} className={styles.foldableListItem}>
            <Button
              onClick={() => select(getId(element))}
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