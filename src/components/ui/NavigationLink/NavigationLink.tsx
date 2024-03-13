'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'
import { AppPathnames } from '@/config'
import { Link } from '@/navigation'

import styles from './NavigationLink.module.scss'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  hover,
  isHeader,
  ...rest
}: ComponentProps<typeof Link<Pathname>> & { hover?: boolean; isHeader?: boolean }) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  const isOtherLink = href !== '/' && hover
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={`${isOtherLink && isHeader && styles['link-header']} ${
        pathname === href && isOtherLink && isHeader && styles['active-header']
      } ${isOtherLink && !isHeader && styles['link-burger']} ${
        pathname === href && isOtherLink && !isHeader && styles['active-burger']
      }`}
      href={href}
      {...rest}
    />
  )
}
