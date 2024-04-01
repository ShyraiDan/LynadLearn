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
  '/dashboard/profile': {
    en: '/dashboard/profile',
    ua: '/dashboard/profile'
  },
  '/dashboard/settings': {
    en: '/dashboard/settings',
    ua: '/dashboard/settings'
  },
  '/dashboard/lists': {
    en: '/dashboard/lists',
    ua: '/dashboard/lists'
  },
  '/dashboard/vocabulary': {
    en: '/dashboard/vocabulary',
    ua: '/dashboard/vocabulary'
  },
  '/dashboard/quiz': {
    en: '/dashboard/quiz',
    ua: '/dashboard/quiz'
  },
  '/dashboard/grammar': {
    en: '/dashboard/grammar',
    ua: '/dashboard/grammar'
  },
  '/dashboard/flashcard': {
    en: '/dashboard/flashcard',
    ua: '/dashboard/flashcard'
  }
} satisfies Pathnames<typeof locales>

export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
