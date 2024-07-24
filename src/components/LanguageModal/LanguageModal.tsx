'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

import styles from './LanguageModal.module.scss'

import { IoIosArrowDown } from 'react-icons/io'

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
      <li className={styles['nav-item']}>
        {localActive === 'en' ? t('english') : t('ukrainian')}
        <IoIosArrowDown />
        <div className={styles.modal}>
          <ul>
            <li className={`${localActive === 'en' && styles.selected}`} onClick={() => changeLang('en')}>
              {t('english')}
            </li>
            <li className={`${localActive === 'ua' && styles.selected}`} onClick={() => changeLang('ua')}>
              {t('ukrainian')}
            </li>
          </ul>
        </div>
      </li>
    </>
  )
}
