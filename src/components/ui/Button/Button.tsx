import styles from './Button.module.scss'
import { IButton } from './Button.interface'

export function Button({ children, onClick, type, outline, disabled, className }: IButton) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={`${styles.button} ${outline && styles.outline} ${className}`}
        onClick={onClick}>
        {children}
      </button>
    </>
  )
}
