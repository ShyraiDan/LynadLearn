import styles from './Input.module.scss'
import { IInput } from './Input.interface'

export function Input({ type, placeholder, name, id, children }: IInput) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      <input className={styles.input} type={type} placeholder={placeholder} name={name} id={id} />
    </>
  )
}
