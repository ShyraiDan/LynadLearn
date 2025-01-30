import styles from './WordsTable.module.scss'
import { getTranslations } from 'next-intl/server'
import { getWordsByListId, getWordsByListIdSortedByName } from '@/lib/word'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { IWord } from '@/interfaces/Word.interface'
import { DWords } from '@/mock/Words.mock'
import { WordDefinition } from '@/components/WordDefinition/WordDefinition'
import { twMerge } from 'tailwind-merge'

import { FaBookAtlas } from 'react-icons/fa6'
import { TbVocabulary } from 'react-icons/tb'
import { BsChatDotsFill } from 'react-icons/bs'
import { FaRunning } from 'react-icons/fa'
import { SlSpeech } from 'react-icons/sl'
import { AiOutlineTranslation } from 'react-icons/ai'
import { IoDocument } from 'react-icons/io5'

//TODO: fix loader

async function WordsList({ listId, sorting }: { listId: string; sorting: string }) {
  const t = await getTranslations('dashboard.vocabulary')
  let words: IWord[] = []

  switch (sorting) {
    case 'a-z':
      await getWordsByListIdSortedByName(listId, sorting).then((data) => (words = data))
      break
    case 'z-a':
      await getWordsByListIdSortedByName(listId, sorting).then((data) => (words = data))
      break
    default:
      await getWordsByListId(listId).then((data) => (words = data))
      break
  }

  words = [...words, ...DWords]

  if (!words?.length) {
    return <div className={twMerge(styles['no-words'], 'dark:text-grey-600')}>{t('no_words')}</div>
  }

  return (
    <>
      {words && words.length && (
        <div className={twMerge(styles['table-data'])}>
          <div className={twMerge(styles.row, styles.header, 'rounded-t-lg dark:bg-[#1D2D4D]')}>
            <div className="rounded-tl-sm">
              <TbVocabulary className={styles.icon} size={16} />
              {t('word')}
            </div>
            <div>
              <SlSpeech className={styles.icon} size={16} />
              {t('part_of_speech')}
            </div>
            <div>
              <IoDocument className={styles.icon} size={16} />
              {t('definition')}
            </div>
            <div>
              <FaBookAtlas className={styles.icon} size={16} />
              {t('synonym')}
            </div>
            <div>
              <AiOutlineTranslation className={styles.icon} size={16} />
              {t('translation')}
            </div>
            <div>
              <BsChatDotsFill className={styles.icon} size={16} />
              {t('pronunciation')}
            </div>
            <div>
              <FaRunning className={styles.icon} size={16} />
              {t('example')}
            </div>
          </div>

          <WordDefinition words={words} />
        </div>
      )}
    </>
  )
}

export default function WordsTable({ listId, sorting }: { listId: string; sorting: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <Suspense fallback={<Loader />}>
          <WordsList listId={listId} sorting={sorting} />
        </Suspense>
      </div>
    </div>
  )
}
