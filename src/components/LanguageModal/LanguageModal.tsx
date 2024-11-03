'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import styles from './LanguageModal.module.scss'

import { IoIosArrowDown } from 'react-icons/io'

//TODO while hovering the text make hovering together with text (for now we have small delay arrow and text)

export default function LanguageModal() {
  const router = useRouter()
  const pathname = usePathname()
  const localActive = useLocale()
  const t = useTranslations('Language')

  const changeLang = (lang: string) => {
    const path = pathname
    const newPath = path.split('/')
    newPath.splice(0, 2)

    router.replace(`/${lang}/${newPath.join('/')}`)
  }

  return (
    <>
      <li className={twMerge(styles['nav-item'], 'dark:text-grey-600')}>
        {localActive === 'en' ? t('english') : t('ukrainian')}
        <IoIosArrowDown />
        <div className={styles.modal}>
          <ul className='dark:bg-[#1D2D4D]'>
            <li
              className={twMerge('dark:text-grey-600', localActive === 'en' && styles.selected)}
              onClick={() => changeLang('en')}>
              {t('english')}
            </li>
            <li
              className={twMerge('dark:text-grey-600', localActive === 'ua' && styles.selected)}
              onClick={() => changeLang('ua')}>
              {t('ukrainian')}
            </li>
          </ul>
        </div>
      </li>
    </>
  )
}
