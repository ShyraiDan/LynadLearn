import styles from './Button.module.scss'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean
  outline?: boolean
  type?: HTMLButtonElement['type']
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, outline, className, disabled, type, ...props }, ref) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className={twMerge(styles.button, outline && styles.outline, className)}
        ref={ref}
        {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
