import styles from './Footer.module.css'
import SmartLink from "./SmartLink"

export interface LinkItem{
    href: string
    title: string
}

interface LinkListerProps{
    links: LinkItem[]
    className?: string
    listTitle?: string
}

export default function LinkLister({links, className, listTitle} : LinkListerProps) {
    if(!links || links.length == 0)
        return null

    return (
        <section className={styles.linkSection}>
            {listTitle && <h3 className={styles.linkListTitle}>{listTitle}</h3>}
            <ul className={styles.list}>
                {
                    links.map(link =>{
                        return (<li key={link.href}>
                            <SmartLink
                                href={link.href}
                                title={link.title}
                            />
                        </li>)
                    }
                    )
                }
            </ul>
        </section>
    )
}