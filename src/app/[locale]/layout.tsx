import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'
import { SITE_NAME } from '@/constants/seo.constants'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { NextIntlClientProvider, useMessages } from 'next-intl'

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
  params: {
    locale: string
  }
}

export default function RootLayout({ children, params: { locale } }: Readonly<RootLayoutProps>) {
  const messages = useMessages()

  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

