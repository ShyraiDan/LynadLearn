'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useEffect, useRef, useState } from 'react'

import { IoIosArrowDown } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'

export default function LanguageModal() {
  const router = useRouter()
  const pathname = usePathname()
  const localActive = useLocale()
  const t = useTranslations('Language')
  const [isOpen, setOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const changeLang = (lang: string) => {
    const path = pathname
    const newPath = path.split('/')
    newPath.splice(0, 2)

    router.replace(`/${lang}/${newPath?.join('/')}`)
  }

  return (
    <>
      <div className="relative w-12">
        <div
          ref={buttonRef}
          className="flex items-center gap-2 justify-between font-bold cursor-pointer text-blue-200 dark:text-grey-600"
          onClick={() => setOpen(!isOpen)}
        >
          {localActive === 'en' ? t('english') : t('ukrainian')}
          <IoIosArrowDown className={twMerge('ml-1', isOpen && 'rotate-180')} />
        </div>
        {isOpen && (
          <ul
            ref={menuRef}
            className="rounded-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] bg-white-100 absolute top-[25px] left-[-5px] dark:bg-[#1D2D4D] p-2 w-15"
          >
            <li
              className={twMerge(
                'cursor-pointer flex items-center gap-2 dark:text-grey-600',
                localActive === 'en' && 'cursor-default opacity-50'
              )}
              onClick={() => changeLang('en')}
            >
              {t('english')}
              {localActive === 'en' && <TiTick />}
            </li>
            <li
              className={twMerge(
                'cursor-pointer flex items-center gap-2 dark:text-grey-600',
                localActive === 'ua' && 'cursor-default opacity-50'
              )}
              onClick={() => changeLang('ua')}
            >
              {t('ukrainian')}
              {localActive === 'ua' && <TiTick />}
            </li>
          </ul>
        )}
      </div>
    </>
  )
}
