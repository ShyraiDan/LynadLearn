'use client'

import { IWord } from '@/interfaces/Word.interface'
import styles from './WordDefinition.module.scss'
import EditDeleteWordModal from '../WordsTable/EditDeleteWordModal/EditDeleteWordModal'
import { useState, MouseEvent } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import Image from 'next/image'
import { Button } from '@/components/ui/Button/Button'
import { MeaningCard } from '@/components/MeaningCard/MeaningCard'

import us from '@/assets/icons/us.svg'

interface IWordDefinition {
  words: IWord[]
}

export const WordDefinition = ({ words }: IWordDefinition) => {
  const [open, setOpen] = useState(false)
  const [word, setWord] = useState<IWord | null>(null)

  const showModal = (e: MouseEvent<HTMLDivElement>, word: IWord | null) => {
    e.stopPropagation()
    setOpen((state) => !state)
    removeScrollBar(open)
    setWord(word)
  }

  return (
    <>
      {words.map((word: IWord) => {
        return (
          <div key={word._id} className={styles.row} onClick={(e) => showModal(e, word)}>
            <div className='lowercase'>{word.word}</div>
            <div className='lowercase'>
              {[...new Set(word.results.map((result) => result.part_of_speech))].join(', ')}
            </div>
            <div className='lowercase'>{word.results[0].definition}</div>
            <div className='lowercase'>
              {[...new Set([word.results.map((result) => result.synonyms)].flat(2))].slice(0, 5).join(', ')}
            </div>
            <div className='lowercase'>{word.translation.ua.join(', ')}</div>
            <div className='lowercase'>{word.pronunciation}</div>
            <div>{word.results[0].examples.join(', ')}</div>

            <div className={styles['word-modal']}>
              <EditDeleteWordModal word={word} />
            </div>
          </div>
        )
      })}

      {open && word && (
        <Modal isOpen={open} handleClose={(e) => showModal(e, null)}>
          <div className={styles.modal}>
            <div className={styles['col-1']}>
              <div>
                <div className={styles.word}>
                  <div className={styles.heading}>
                    <div className={styles['word-section']}>{word.word}</div>
                  </div>
                  <div className={styles.translation}>
                    <Image src={us} alt='us' className={styles.flag} />/{word.pronunciation}/
                  </div>
                </div>
                <div className={styles['lang-parts']}>
                  {Object.entries(
                    word.results.reduce(
                      (acc: { [key: string]: number }, { part_of_speech }) => ({
                        ...acc,
                        [part_of_speech]: (acc[part_of_speech] || 0) + 1
                      }),
                      {}
                    )
                  ).map(([partOfSpeech, count]) => (
                    <Button key={partOfSpeech}>
                      {partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)} ({count})
                    </Button>
                  ))}
                </div>
              </div>

              <MeaningCard word={word} />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
