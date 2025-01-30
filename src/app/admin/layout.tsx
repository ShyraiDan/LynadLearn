import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SITE_NAME } from '@/constants/seo.constants'
import '../globals.scss'

const font = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--main-font',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Best one for learning from ShyraiDan'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
