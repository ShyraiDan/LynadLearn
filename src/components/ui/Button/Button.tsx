import styles from './Button.module.scss'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface IButton {
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
  onClick?: (() => void) | ((e: any) => void)
  disabled?: boolean
  className?: string
}

export function Button({ children, onClick, type, outline, disabled, className }: IButton) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={twMerge(styles.button, outline && styles.outline, className)}
        onClick={onClick}>
        {children}
      </button>
    </>
  )
}

// TODO: Implement this refactored
// import styles from './Button.module.scss'
// import { forwardRef } from 'react'
// import { twMerge } from 'tailwind-merge'

// type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & { outline?: boolean }

// const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, outline, className, ...props }, ref) => {
//   return (
//     <button className={twMerge(styles.button, outline && styles.outline, className)} ref={ref} {...props}>
//       {children}
//     </button>
//   )
// })

// Button.displayName = 'Button'

// export default Button
