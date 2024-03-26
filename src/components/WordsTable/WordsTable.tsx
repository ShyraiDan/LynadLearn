import styles from './WordsTable.module.scss'

import { DWords } from '@/mock/Words.mock'

import { FaBookAtlas } from 'react-icons/fa6'
import { TbVocabulary } from 'react-icons/tb'
import { BsChatDotsFill } from 'react-icons/bs'
import { FaRunning } from 'react-icons/fa'
import { SlSpeech } from 'react-icons/sl'
import { AiOutlineTranslation } from 'react-icons/ai'

export default function WordsTable() {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {!DWords.length && <div className={styles['no-words']}>Unfortunately you don&apos;t have any words yet</div>}
        {DWords.length ? (
          <div className={styles['table-data']}>
            <div className={`${styles.row} ${styles.header}`}>
              <div>
                <TbVocabulary className={styles.icon} />
                Word
              </div>
              <div>
                <SlSpeech className={styles.icon} />
                Part of Speech
              </div>
              <div>
                <FaBookAtlas className={styles.icon} />
                Definition
              </div>
              <div>
                <AiOutlineTranslation className={styles.icon} />
                Translation
              </div>
              <div>
                <BsChatDotsFill className={styles.icon} />
                Pronunciation
              </div>
              <div>
                <FaRunning className={styles.icon} />
                Example
              </div>
            </div>
            {DWords.map((item) => {
              return (
                <div key={item.id} className={styles.row}>
                  <div>{item.word}</div>
                  <div>{item.part_of_speech}</div>
                  <div>{item.definition}</div>
                  <div>{item.translation}</div>
                  <div>{item.pronunciation}</div>
                  <div>{item.example}</div>
                </div>
              )
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
