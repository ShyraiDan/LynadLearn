import styles from './WordsTable.module.scss'
import EditDeleteWordModal from './EditDeleteWordModal/EditDeleteWordModal'
import { getTranslations } from 'next-intl/server'
import { getWordsByListId, getWordsByListIdSortedByName } from '@/lib/word'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { IWord } from '@/interfaces/Word.interface'

import { FaBookAtlas } from 'react-icons/fa6'
import { TbVocabulary } from 'react-icons/tb'
import { BsChatDotsFill } from 'react-icons/bs'
import { FaRunning } from 'react-icons/fa'
import { SlSpeech } from 'react-icons/sl'
import { AiOutlineTranslation } from 'react-icons/ai'

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

  return (
    <>
      {!words?.length && <div className={styles['no-words']}>{t('no_words')}</div>}
      {words && words.length && (
        <div className={styles['table-data']}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>
              <TbVocabulary className={styles.icon} />
              {t('word')}
            </div>
            <div>
              <SlSpeech className={styles.icon} />
              {t('part_of_speech')}
            </div>
            <div>
              <FaBookAtlas className={styles.icon} />
              {t('definition')}
            </div>
            <div>
              <AiOutlineTranslation className={styles.icon} />
              {t('translation')}
            </div>
            <div>
              <BsChatDotsFill className={styles.icon} />
              {t('pronunciation')}
            </div>
            <div>
              <FaRunning className={styles.icon} />
              {t('example')}
            </div>
          </div>
          {words.map((item: IWord) => {
            return (
              <div key={item._id} className={styles.row}>
                <div>{item.word}</div>
                <div>{item.part_of_speech}</div>
                <div>{item.definition}</div>
                <div>{item.translation}</div>
                <div>{item.pronunciation}</div>
                <div>{item.example}</div>
                <div className={styles['word-modal']}>
                  <EditDeleteWordModal word={item} />
                </div>
              </div>
            )
          })}
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
