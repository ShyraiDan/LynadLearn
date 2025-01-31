'use client'

import styles from './WordCard.module.scss'
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import { IWord } from '@/interfaces/Word.interface'
import { Badge } from '@/components/Badge/Badge'
import { ListsModal } from '@/components/ListsModal/ListsModal'
import { twMerge } from 'tailwind-merge'
import { H6 } from '@/components/ui/Typography/Typography'

import usFlag from '@/assets/icons/us.svg'

export const WordCard = ({ word }: { word: IWord }) => {
  return (
    <div className={styles['word-card']}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={twMerge(styles.word, 'dark:text-grey-600')}>{word.word}</div>
          <div className={styles.btns}>
            <ListsModal word={word} />
          </div>
        </div>
        <div className={styles.pronunciation}>
          <Image src={usFlag} alt="flag" width={24} />
          <H6 className="font-medium text-sm sm:text-base dark:text-grey-600">/{word.pronunciation}/</H6>
        </div>
        <Badge part={word.results[0].part_of_speech} className={styles['part-of-speech']} />
        <H6 className="mb-2 text-justify w-full overflow-hidden font-medium text-base sm:text-lg xl:w-2/3 dark:text-grey-600">
          {word.results[0]?.definition}
        </H6>
        <div className={styles.synonyms}>
          {word.results[0]?.synonyms.map((synonym) => (
            <Button key={synonym}>
              <span>≈</span> {synonym}
            </Button>
          ))}
        </div>
      </div>

      {word.results[0].examples.length > 0 && <WordExamples examples={word.results[0]?.examples} />}
    </div>
  )
}
