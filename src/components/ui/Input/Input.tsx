import styles from './Input.module.scss'
import { HTMLInputTypeAttribute, ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface IInput {
  type: HTMLInputTypeAttribute | undefined
  placeholder?: string
  name: string
  id?: string
  required?: boolean
  children?: ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  checked?: boolean
  obj?: Object
  labelStyles?: string
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ type, placeholder, name, id, children, required, obj, onChange, value, checked, labelStyles }, ref) => {
    return (
      <>
        <label className={twMerge(styles.label, labelStyles, 'dark:text-grey-600')} htmlFor={id}>
          {children}
        </label>
        <input
          required={required}
          className={twMerge(
            styles.input,
            'dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600'
          )}
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
          {...obj}
        />
      </>
    )
  }
)

Input.displayName = 'Input'
