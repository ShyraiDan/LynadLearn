import styles from './WordsTable.module.scss'
import EditDeleteWordModal from './EditDeleteWordModal/EditDeleteWordModal'
import { useTranslations } from 'next-intl'

import { DWords } from '@/mock/Words.mock'

import { FaBookAtlas } from 'react-icons/fa6'
import { TbVocabulary } from 'react-icons/tb'
import { BsChatDotsFill } from 'react-icons/bs'
import { FaRunning } from 'react-icons/fa'
import { SlSpeech } from 'react-icons/sl'
import { AiOutlineTranslation } from 'react-icons/ai'

export default function WordsTable({ list }: any) {
  const t = useTranslations('dashboard.vocabulary')

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {!list.words.length && <div className={styles['no-words']}>{t('no_words')}</div>}
        {list.words.length && (
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
            {/* {DWords.map((item) => {
              return (
                <div key={item.id} className={styles.row}>
                  <div>{item.word}</div>
                  <div>{item.part_of_speech}</div>
                  <div>{item.definition}</div>
                  <div>{item.translation}</div>
                  <div>{item.pronunciation}</div>
                  <div>{item.example}</div>
                  <div className={styles['word-modal']}>
                    <EditDeleteWordModal />{' '}
                  </div>
                </div>
              )
            })} */}
            {list.words.map((item: any) => {
              return (
                <div key={item.id} className={styles.row}>
                  <div>{item.word}</div>
                  <div>{item.part_of_speech}</div>
                  <div>{item.definition}</div>
                  <div>{item.translation}</div>
                  <div>{item.pronunciation}</div>
                  <div>{item.example}</div>
                  <div className={styles['word-modal']}>
                    <EditDeleteWordModal />{' '}
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
