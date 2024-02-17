import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'
import { SITE_NAME } from '@/constants/soe.constants'

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  )
}

