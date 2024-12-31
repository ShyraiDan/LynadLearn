import styles from './Button.module.scss'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & { outline?: boolean; type?: HTMLButtonElement['type'] }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, outline, className, type, ...props }, ref) => {
  return (
    <button type={type} className={twMerge(styles.button, outline && styles.outline, className)} ref={ref} {...props}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
