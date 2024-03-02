'use client'

import { useState, ChangeEvent, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import styles from './LanguageModal.module.scss'

import { IoIosArrowDown } from 'react-icons/io'

export default function LanguageModal() {
  const [isLanguageModal, setLanguageModal] = useState(false)
  const [isPending, startTransition] = useTransition()
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
      <li className={styles['nav-item']} onClick={() => setLanguageModal((state) => !state)}>
        English
        <IoIosArrowDown className={`${styles.arrow} ${isLanguageModal && styles.active}`} />
      </li>
      {isLanguageModal && (
        <div className={styles.modal}>
          <ul>
            <li onClick={() => changeLang('en')}>{t('english')}</li>
            <li onClick={() => changeLang('ua')}>{t('ukrainian')}</li>
          </ul>
        </div>
      )}
    </>
  )
}
