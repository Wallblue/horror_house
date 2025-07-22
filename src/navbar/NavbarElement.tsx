import { Link } from "react-router-dom";

interface Props {
    url: string
    title: string
}

export default function NavbarElement({ url, title }: Props) {
    return (
        <li>
            <Link to={url}>{title}</Link>
        </li>
    )
}