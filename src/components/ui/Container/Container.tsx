import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={twMerge(
        'p-4 mt-20 min-h-[calc(100vh-201px-73px)] sm:min-h-[calc(100vh-193px-81px)] md:min-h-[calc(100vh-153px-81px)] lg:min-h-[calc(100vh-97px-81px)]',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Container.displayName = 'Container'

export default Container
