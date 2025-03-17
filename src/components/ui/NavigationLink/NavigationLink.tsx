'use client'

import { ComponentProps } from 'react'
import { AppPathnames } from '@/config'
import { Link } from '@/navigation'
import { twMerge } from 'tailwind-merge'
import { usePathname } from '@/navigation'

import styles from './NavigationLink.module.scss'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  hover,
  isHeader,
  className,
  ...rest
}: ComponentProps<typeof Link<Pathname>> & { hover?: boolean; isHeader?: boolean }) {
  const path = usePathname()
  const isActive = path === href

  const isOtherLink = href !== '/' && hover
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={twMerge(
        isOtherLink && isHeader && styles['link-header'],
        isActive && isOtherLink && isHeader && styles['active-header'],
        isOtherLink && !isHeader && styles['link-burger'],
        isActive && isOtherLink && !isHeader && styles['active-burger'],
        ' dark:text-grey-600 dark:after:bg-grey-600 dark:lg:hover:after:bg-grey-600',
        className
      )}
      href={href}
      {...rest}
    />
  )
}
