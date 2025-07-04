import styles from '../css/Footer.module.css'
import { Link, LinkProps } from "react-router-dom";

// We can have props of <Link> and from <a>
export type SmartLinkProps = Omit<LinkProps, 'to'> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  title?: string
};

export default function SmartLink({href, children, title, ...rest}: SmartLinkProps) {
    const isExternal : boolean = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if(isExternal){
        return (
            <a
            href={href}
            className={styles.link}
            target='_blank'
            rel='noopener noreferrer'
            {...rest}
            >
                {title ? title : children}
            </a>
        )
    } else {
        return (
            <Link
            to={href}
            className={styles.link}
            {...rest}
            >
                {title ? title : children}
            </Link>
        )
    }
}