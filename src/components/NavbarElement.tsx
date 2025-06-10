import { Link } from "react-router-dom";

interface NavbarElementProps{
    url: string
    title: string
}

export default function NavbarElement({url, title} : NavbarElementProps) {
    return (
        <li>
            <Link to={url}>{title}</Link>
        </li>
    )
}