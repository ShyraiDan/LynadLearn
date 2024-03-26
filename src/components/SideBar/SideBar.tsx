'use client'

import styles from './SideBar.module.scss'
import { usePathname } from 'next/navigation'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

import { FaUser } from 'react-icons/fa'
import { TbVocabulary } from 'react-icons/tb'
import { TbCardsFilled } from 'react-icons/tb'
import { TbWriting } from 'react-icons/tb'
import { IoSettingsSharp } from 'react-icons/io5'
import { BsQuestionSquareFill } from 'react-icons/bs'

export default function SideBar() {
  const path = usePathname()

  const page = path.split('/')[3]

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <NavigationLink href={'/profile'} className={`${page === 'profile' && styles.selected}`}>
            <FaUser /> Profile
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/lists'} className={`${page === 'lists' && styles.selected}`}>
            <TbVocabulary />
            Vocabulary
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/quiz'} className={`${page === 'quiz' && styles.selected}`}>
            <BsQuestionSquareFill />
            Quiz
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/grammar'} className={`${page === 'grammar' && styles.selected}`}>
            <TbWriting />
            Grammar
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/dashboard/flashcard'} className={`${page === 'flashcards' && styles.selected}`}>
            <TbCardsFilled />
            Flashcard
          </NavigationLink>
        </li>
        <li>
          <NavigationLink href={'/settings'} className={`${page === 'settings' && styles.selected}`}>
            <IoSettingsSharp />
            Settings
          </NavigationLink>
        </li>
      </ul>
    </div>
  )
}
