import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './config'

enum Language {
  English = 'en',
  Ukrainian = 'ua'
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Language)) notFound()

  return {
    messages: (await (locale === 'en' ? import('../messages/en.json') : import(`../messages/${locale}.json`))).default
  }
})
