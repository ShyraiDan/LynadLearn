'use client'

import styles from './LearnCategoryPage.module.scss'
import { WordCard } from '@/components/WordCard/WordCard'
import Button from '@/components/ui/Button/Button'
import { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { getSectionById } from '@/lib/sections'
import { ISection } from '@/interfaces/Section.interface'

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

//TODO:
// add loader and message when no list found

interface LearnCategoryPageProps {
  params: {
    locale: string
    sectionId: string
  }
}

export default function LearnCategoryPage({ params }: LearnCategoryPageProps) {
  const { sectionId } = params
  const [word, setWord] = useState(0)
  const [section, setSection] = useState<ISection | null>(null)

  useEffect(() => {
    getSectionById(sectionId).then((data) => setSection(data))
  }, [sectionId])

  return (
    <div className={styles.container}>
      {section && (
        <>
          <div className={styles.switcher}>
            <Button
              className={twMerge(styles.btn, 'dark:!bg-[#1D2D4D] dark:!text-grey-600 dark:lg:hover:!bg-purple-100')}
              onClick={() => setWord(word - 1 < 0 ? 0 : word - 1)}
            >
              <IoIosArrowBack size={20} />
            </Button>
            <Button
              className={twMerge(styles.btn, 'dark:!bg-[#1D2D4D] dark:!text-grey-600 dark:lg:hover:!bg-purple-100')}
              onClick={() => setWord(word + 1 >= section?.words.length - 1 ? section?.words.length - 1 : word + 1)}
            >
              <IoIosArrowForward size={20} />
            </Button>
          </div>

          <WordCard word={section?.words[word]} />
        </>
      )}
    </div>
  )
}
