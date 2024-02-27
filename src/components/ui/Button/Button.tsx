import styles from './Button.module.scss'
import { IButton } from './Button.interface'
import Link from 'next/link'

export function Button({ children, href, onClick, type, outline }: IButton) {
  console.log('btn', outline)

  return (
    <>
      {href ? (
        <Link href={href} className={`${styles.button} ${outline && styles.outline}`}>
          {children}
        </Link>
      ) : (
        <button type={type} className={`${styles.button} ${outline && styles.outline}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  )
}
