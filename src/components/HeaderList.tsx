interface HeaderListProps {
    elements : HeaderElement[]
}

export interface HeaderElement {
  header: string
  text: string
}

export default function HeaderList({elements} : HeaderListProps) {
    return (<ul>
        {elements.map((element: HeaderElement, i : number) => 
            <li key={element.header + i}><strong>{element.header}</strong> — {element.text}</li>
        )}
    </ul>)
}