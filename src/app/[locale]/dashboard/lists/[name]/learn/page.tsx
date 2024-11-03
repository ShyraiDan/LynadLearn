'use client'

import styles from './LearnCategoryPage.module.scss'
import { WordCard } from '@/components/WordCard/WordCard'
import { DWords } from '@/mock/Words.mock'
import { Button } from '@/components/ui/Button/Button'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

//TODO:
// add loader and message when no list found

export default function LearnCategoryPage() {
  const [word, setWord] = useState(0)
  const ttt = DWords[word]

  return (
    <div className={styles.container}>
      <div className={styles.switcher}>
        <Button
          className={twMerge(styles.btn, 'dark:!bg-[#1D2D4D] dark:!text-grey-600 dark:hover:!bg-purple-100')}
          onClick={() => setWord(word - 1 < 0 ? 0 : word - 1)}>
          <IoIosArrowBack size={20} />
        </Button>
        <Button
          className={twMerge(styles.btn, 'dark:!bg-[#1D2D4D] dark:!text-grey-600 dark:hover:!bg-purple-100')}
          onClick={() => setWord(word + 1 >= DWords.length - 1 ? DWords.length - 1 : word + 1)}>
          <IoIosArrowForward size={20} />
        </Button>
      </div>

      <WordCard word={ttt} />
    </div>
  )
}
