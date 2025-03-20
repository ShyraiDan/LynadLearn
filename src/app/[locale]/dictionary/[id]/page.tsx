import { Suspense } from 'react'
import styles from './DictionaryWord.module.scss'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import Button from '@/components/ui/Button/Button'
import Image from 'next/image'
import { MeaningCard } from '@/components/MeaningCard/MeaningCard'
import { getTranslations } from 'next-intl/server'
import { ListsModal } from '@/components/ListsModal/ListsModal'
import { H3 } from '@/components/ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'
import Container from '@/components/ui/Container/Container'
import { getDefaultWordsById } from '@/lib/defaultWords'

import us from '@/assets/icons/us.svg'
import { MessageQuestion } from '@/components/ui/Icons/Icons'

interface DictionaryWordPageWrapperProps {
  params: {
    id: string
  }
}

interface DictionaryWordPageProps {
  id: string
}

async function DictionaryWordPage({ id }: DictionaryWordPageProps) {
  const t = await getTranslations('Dictionary')
  const word = await getDefaultWordsById(id)

  const partsOfSpeech = word.results.reduce(
    (acc: { [key: string]: number }, { part_of_speech }) => ({
      ...acc,
      [part_of_speech]: (acc[part_of_speech] || 0) + 1
    }),
    {}
  )

  const synonyms = new Set(word.results.flatMap(({ synonyms }) => synonyms))

  return (
    <>
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
    </>
  )
}

export default function DictionaryWordPageWrapper({ params }: DictionaryWordPageWrapperProps) {
  return (
    <Container className={styles.container}>
      <Suspense>
        <DictionaryWordPage id={params.id} />
      </Suspense>
    </Container>
  )
}
