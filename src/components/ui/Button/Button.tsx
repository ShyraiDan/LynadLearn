import styles from './Button.module.scss'
import { IButton } from './Button.interface'
import Link from 'next/link'

export function Button({ children, href, onClick }: IButton) {
  return (
    <>
      {href ? (
        <Link href={href} className={styles.button}>
          {children}
        </Link>
      ) : (
        <button className={styles.button} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  )
}
