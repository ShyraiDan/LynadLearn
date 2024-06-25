import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'
import { SITE_NAME } from '@/constants/seo.constants'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Suspense } from 'react'

import { authMe, register } from '../../lib/auth'

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

  // async function Users() {
  //   const users = await authMe()

  //   console.log('component', users)

  //   return (
  //     <div>
  //       {users.map((user) => {
  //         return <p key={user._id}>{user.userName}</p>
  //       })}
  //     </div>
  //   )
  // }

  // Users()

  // async function CreateUser() {
  //   const user = await register({
  //     userName: 'test user',
  //     email: 'test@gmail.com',
  //     location: 'Texas',
  //     description: 'something...',
  //     password: '123456'
  //   })

  //   console.log('component', user)

  //   return (
  //     <div>
  //       {/* {users.map((user) => {
  //         return <p key={user._id}>{user.userName}</p>
  //       })} */}
  //       {user?.userName}
  //     </div>
  //   )
  // }

  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          {/* <Suspense fallback={'Fetching meals ...'}>
            <Users />
            <CreateUser />
          </Suspense> */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

