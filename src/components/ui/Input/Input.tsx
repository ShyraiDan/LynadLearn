import styles from './Input.module.scss'
import { HTMLInputTypeAttribute, ReactNode } from 'react'

interface IInput {
  type: HTMLInputTypeAttribute | undefined
  placeholder?: string
  name: string
  id: string
  required?: boolean
  children?: ReactNode
  onChange?: (e: any) => void
  value?: string
  checked?: boolean
  obj?: Object
}

export function Input({ type, placeholder, name, id, children, required, obj, onChange, value, checked }: IInput) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      <input
        required={required}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
        {...obj}
      />
    </>
  )
}
