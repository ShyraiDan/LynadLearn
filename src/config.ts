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
  '/dashboard/lists': {
    en: '/dashboard/lists',
    ua: '/dashboard/lists'
  }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
