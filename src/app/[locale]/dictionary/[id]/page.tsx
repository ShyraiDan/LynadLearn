import { DWords } from '@/mock/Words.mock'
import styles from './DictionaryWord.module.scss'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import Button from '@/components/ui/Button/Button'
import Image from 'next/image'
import { MeaningCard } from '@/components/MeaningCard/MeaningCard'
import { useTranslations } from 'next-intl'
import { ListsModal } from '@/components/ListsModal/ListsModal'
import { H3 } from '@/components/ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'

import us from '@/assets/icons/us.svg'
import { MessageQuestion } from '@/components/ui/Icons/Icons'

export default function DictionaryWordPage() {
  //TODO: remove unused variables
  const t = useTranslations('Dictionary')

  const word = DWords[0]

  const partsOfSpeech = word.results.reduce(
    (acc: { [key: string]: number }, { part_of_speech }) => ({
      ...acc,
      [part_of_speech]: (acc[part_of_speech] || 0) + 1
    }),
    {}
  )

  const synonyms = new Set(word.results.flatMap(({ synonyms }) => synonyms))

  return (
    <div className={styles.container}>
      <div className={styles['col-1']}>
        <div>
          <div className={twMerge(styles.word, 'dark:!bg-[#16274A]')}>
            <div className={styles.heading}>
              <div className={twMerge(styles['word-section'], 'dark:text-grey-600')}>{word.word}</div>
              <div className={styles.btns}>
                <ListsModal word={word} />
              </div>
            </div>
            <div className={twMerge(styles.translation, 'dark:text-grey-600')}>
              <Image src={us} alt="us" className={styles.flag} />/{word.pronunciation}/
            </div>
          </div>
          <div className={twMerge(styles['lang-parts'], 'dark:!bg-[#1D2D4D]')}>
            {Object.entries(partsOfSpeech).map(([partOfSpeech, count]) => (
              <Button key={partOfSpeech} className="!cursor-default lg:hover:!bg-blue-200">
                {partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)} ({count})
              </Button>
            ))}
          </div>
        </div>

        <MeaningCard word={word} />
      </div>
      <div className={styles['col-2']}>
        <WordExamples examples={word.results[0].examples} />
        <div className={twMerge(styles.examples, 'dark:!bg-[#1D2D4D]')}>
          <div className={styles['examples-header']}>
            <div className={styles.title}>
              <MessageQuestion className="dark:fill-grey-600" />
              <H3 className="m-0 text-base sm:text-lg font-bold">{t('nearby_words')}</H3>
            </div>
          </div>
          <ul className={styles.synonyms}>
            {Array.from(synonyms).map((item: string, index: number) => (
              <li key={index} className="dark:text-grey-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
