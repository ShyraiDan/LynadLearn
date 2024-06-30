'use client'

import styles from './WordsTable.module.scss'
import EditDeleteWordModal from './EditDeleteWordModal/EditDeleteWordModal'
import { useTranslations } from 'next-intl'
import { getWordsByListId, getWordsByListIdSortedByName } from '@/lib/word'

import { FaBookAtlas } from 'react-icons/fa6'
import { TbVocabulary } from 'react-icons/tb'
import { BsChatDotsFill } from 'react-icons/bs'
import { FaRunning } from 'react-icons/fa'
import { SlSpeech } from 'react-icons/sl'
import { AiOutlineTranslation } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function WordsTable({ listId }: { listId: string }) {
  const [words, setWords] = useState<any>(null)
  const t = useTranslations('dashboard.vocabulary')
  const sort = useSearchParams().get('sort')

  useEffect(() => {
    switch (sort) {
      case 'a-z':
        getWordsByListIdSortedByName(listId, sort).then((data) => setWords(data))
        break
      case 'z-a':
        getWordsByListIdSortedByName(listId, sort).then((data) => setWords(data))
        break
      default:
        getWordsByListId(listId).then((data) => setWords(data))
        break
    }
  }, [sort])

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {!words === null && <div className={styles['no-words']}>{t('no_words')}</div>}
        {words && words.length > 0 && (
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
            {words.map((item: any) => {
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
      </div>
    </div>
  )
}
