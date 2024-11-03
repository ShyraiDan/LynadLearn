'use client'

import styles from './SideBar.module.scss'
import { usePathname } from 'next/navigation'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

import { FaUser } from 'react-icons/fa'
import { TbVocabulary, TbCardsFilled, TbWriting } from 'react-icons/tb'
import { IoSettingsSharp } from 'react-icons/io5'
import { BsQuestionSquareFill } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa6'

export default function SideBar({ isAuth }: { isAuth: boolean }) {
  const t = useTranslations('Header')
  const path = usePathname()

  const page = path.split('/')[3]

  return (
    <div className={twMerge(styles.container, 'dark:border-[#1D2D4D]')}>
      <ul>
        {isAuth && (
          <li>
            <NavigationLink href={'/dashboard/profile'} className={`${page === 'profile' && styles.selected}`}>
              <FaUser /> {t('profile')}
            </NavigationLink>
          </li>
        )}
        {isAuth && (
          <li>
            <NavigationLink href={'/dashboard/bookmarks'} className={`${page === 'bookmarks' && styles.selected}`}>
              <FaBookmark />
              {t('bookmarks')}
            </NavigationLink>
          </li>
        )}
        <li>
          <NavigationLink href={'/dashboard/lists'} className={`${page === 'lists' && styles.selected}`}>
            <TbVocabulary />
            {t('vocabulary')}
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/quiz?type=grammar'} className={`${page === 'quiz' && styles.selected}`}>
            <BsQuestionSquareFill />
            {t('quiz')}
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/grammar'} className={`${page === 'grammar' && styles.selected}`}>
            <TbWriting />
            {t('grammar')}
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/flashcard'} className={`${page === 'flashcards' && styles.selected}`}>
            <TbCardsFilled />
            {t('flashcard')}
          </NavigationLink>
        </li>
        {/* <li>
          <NavigationLink href={'/settings'} className={`${page === 'settings' && styles.selected}`}>
            <IoSettingsSharp />
            {t('settings')}
          </NavigationLink>
        </li> */}
      </ul>
    </div>
  )
}
