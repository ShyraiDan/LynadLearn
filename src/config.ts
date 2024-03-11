import { Pathnames } from 'next-intl/navigation'

export const locales = ['en', 'ua'] as const

export const pathnames = {
  '/': '/',
  '/about-us': {
    en: '/about-us',
    ua: '/about-us'
  },
  '/pricing': {
    en: '/pricing',
    ua: '/pricing'
  },
  '/contact-us': {
    en: '/contact-us',
    ua: '/contact-us'
  },
  '/dashboard': {
    en: '/dashboard',
    ua: '/dashboard'
  },
  '/mobile-app': {
    en: '/mobile-app',
    ua: '/mobile-app'
  },
  '/dashboard/lists': {
    en: '/dashboard/lists',
    ua: '/dashboard/lists'
  }
} satisfies Pathnames<typeof locales>

export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
