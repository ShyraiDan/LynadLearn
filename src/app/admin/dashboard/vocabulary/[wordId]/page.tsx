import { Suspense } from 'react'
import styles from './DictionaryWord.module.scss'
import { AdminWordExamples } from '@/components/Admin/AdminWordExamples/AdminWordExamples'
import Button from '@/components/ui/Button/Button'
import Image from 'next/image'
import { AdminMeaningCard } from '@/components/Admin/AdminMeaningCard/AdminMeaningCard'
import { H3 } from '@/components/ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'
import Container from '@/components/ui/Container/Container'
import { getDefaultWordsById } from '@/lib/defaultWords'
import AdminConfirmDeleteWordModal from '@/components/Admin/AdminConfirmDeleteWordModal/AdminConfirmDeleteWordModal'
import { AdminEditWordModal } from '@/components/Admin/AdminEditWordModal/AdminEditWordModal'

import us from '@/assets/icons/us.svg'
import { MessageQuestion } from '@/components/ui/Icons/Icons'

interface DictionaryWordPageWrapperProps {
  params: {
    wordId: string
  }
}

interface DictionaryWordPageProps {
  wordId: string
}

async function AdminDictionaryWordPage({ wordId }: DictionaryWordPageProps) {
  const word = await getDefaultWordsById(wordId)

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
      <div className="p-4 pb-0 flex justify-end items-center">
        <div className="flex gap-4">
          <AdminEditWordModal word={word} />
          <AdminConfirmDeleteWordModal wordId={wordId} />
        </div>
      </div>
      <Container className={styles.container}>
        <div className={styles['col-1']}>
          <div>
            <div className={twMerge(styles.word, 'dark:!bg-[#16274A]')}>
              <div className={styles.heading}>
                <div className={twMerge(styles['word-section'], 'dark:text-grey-600')}>{word.word}</div>
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

          <AdminMeaningCard word={word} />
        </div>
        <div className={styles['col-2']}>
          <AdminWordExamples examples={word.results[0].examples} />
          <div className={twMerge(styles.examples, 'dark:!bg-[#1D2D4D]')}>
            <div className={styles['examples-header']}>
              <div className={styles.title}>
                <MessageQuestion className="dark:fill-grey-600" />
                <H3 className="m-0 text-base sm:text-lg font-bold">Synonyms</H3>
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
      </Container>
    </>
  )
}

export default function AdminDictionaryWordPageWrapper({ params }: DictionaryWordPageWrapperProps) {
  return (
    <div className="w-full">
      <Suspense>
        <AdminDictionaryWordPage wordId={params.wordId} />
      </Suspense>
    </div>
  )
}
