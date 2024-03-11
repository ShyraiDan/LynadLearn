'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'
import { AppPathnames } from '@/config'
import { Link } from '@/navigation'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  // console.log(pathname === href && href)

  return <Link aria-current={isActive ? 'page' : undefined} className={''} href={href} {...rest} />
}
