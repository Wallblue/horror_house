
import styles from './Footer.module.css'
import SmartLink from "./SmartLink"

export interface LinkItem{
    href: string
    title: string
}

interface LinkListerProps{
    links: LinkItem[]
    className?: string
}

export default function LinkLister({links} : LinkListerProps) {
    if(!links || links.length == 0)
        return null

    return (
        <ul className={styles.list}>
            {
                links.map(link =>
                    <li key={link.href}>
                        <SmartLink
                            href={link.href}
                            title={link.title}
                        />
                    </li>
                )
            }
        </ul>
    )
}