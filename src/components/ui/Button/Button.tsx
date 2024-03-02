import styles from './Button.module.scss'
import { IButton } from './Button.interface'

export function Button({ children, onClick, type, outline }: IButton) {
  return (
    <>
      <button type={type} className={`${styles.button} ${outline && styles.outline}`} onClick={onClick}>
        {children}
      </button>
    </>
  )
}
