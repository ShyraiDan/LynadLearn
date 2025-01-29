import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TextAreaProps = React.HTMLAttributes<HTMLTextAreaElement> & { rows?: number; placeholder?: string; value?: string }

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, className, rows = 5, placeholder, value, ...props }, ref) => {
    return (
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        className={twMerge(
          'py-2.5 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg resize-none dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600',
          className
        )}
        {...props}
      >
        {children}
      </textarea>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
