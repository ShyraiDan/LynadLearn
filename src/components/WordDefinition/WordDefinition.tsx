'use client'

import { IWord } from '@/interfaces/Word.interface'
import styles from './WordDefinition.module.scss'
import { useState, MouseEvent } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import { MeaningCard } from '@/components/MeaningCard/MeaningCard'
import { twMerge } from 'tailwind-merge'
import WordModal from '@/components/WordModal/WordModal'
import { useTranslations } from 'next-intl'
import { deleteWordById } from '@/lib/word'

import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import us from '@/assets/icons/us.svg'

interface IWordDefinition {
  words: IWord[]
}

export const WordDefinition = ({ words }: IWordDefinition) => {
  const [open, setOpen] = useState(false)
  const [word, setWord] = useState<IWord | null>(null)
  const t = useTranslations('dashboard.vocabulary.modal')
  const [isEdit, setEdit] = useState(false)
  const [isDelete, setDelete] = useState(false)

  const showModal = (e: MouseEvent<HTMLDivElement | SVGElement>, word: IWord | null) => {
    e.stopPropagation()
    setOpen((state) => !state)
    removeScrollBar(open)
    setWord(word)
  }

  const showEditModal = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation()
    setOpen(false)
    setEdit((state) => !state)
    removeScrollBar(isEdit)
  }

  const showDeleteModal = (e: MouseEvent) => {
    setOpen(false)
    setDelete((state) => !state)
    removeScrollBar(isDelete)
  }

  const deleteWord = (word: IWord) => {
    word._id && deleteWordById(word._id)
    setDelete((state) => !state)
    removeScrollBar(isDelete)
  }

  return (
    <>
      {words.map((word: IWord) => {
        return (
          <div key={word._id}>
            <div
              className={twMerge(styles.row, 'dark:bg-[#1D2D4D] dark:hover:bg-purple-100')}
              onClick={(e) => showModal(e, word)}
            >
              <div className="lowercase dark:text-grey-600">{word.word}</div>
              <div className="lowercase dark:text-grey-600">
                {[...new Set(word.results?.map((result) => result.part_of_speech))].join(', ')}
              </div>
              <div className="lowercase dark:text-grey-600">{word.results[0]?.definition}</div>
              <div className="lowercase dark:text-grey-600">
                {[...new Set([word.results?.map((result) => result.synonyms)].flat(2))].slice(0, 5).join(', ')}
              </div>
              <div className="lowercase dark:text-grey-600">{word.translation.ua.join(', ')}</div>
              <div className="lowercase dark:text-grey-600">{word.pronunciation}</div>
              <div className="dark:text-grey-600">{word.results[0]?.examples.join(', ')}</div>
            </div>
          </div>
        )
      })}

      {open && word && (
        <Modal className="dark:bg-[#0B152E]" isOpen={open} handleClose={(e) => e && showModal(e, null)}>
          <div className={styles.modal}>
            <div className={styles['col-1']}>
              <div>
                <div className={twMerge(styles.word, 'dark:!bg-[#1D2D4D]')}>
                  <div className={styles.heading}>
                    <div className={twMerge(styles['word-section'], 'dark:text-grey-600')}>{word.word}</div>
                    <div className={styles['word-modal']}>
                      <MdEdit
                        className="cursor-pointer transition-all duration-300 hover:text-purple-100 dark:text-grey-600 dark:hover:text-purple-100"
                        onClick={(e) => showEditModal(e)}
                        size="16px"
                      />
                      <FaTrash
                        className="cursor-pointer transition-all duration-300 hover:text-red dark:text-grey-600 "
                        onClick={(e) => showDeleteModal(e)}
                      />
                    </div>
                  </div>
                  {word.pronunciation && (
                    <div className={twMerge(styles.translation, 'dark:text-grey-600')}>
                      <Image src={us} alt="us" className={styles.flag} />/{word.pronunciation}/
                    </div>
                  )}
                </div>
                <div className={twMerge(styles['lang-parts'], 'dark:!bg-[#16274A]')}>
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

      {isEdit && word && (
        <Modal className="dark:bg-[#0B152E]" isOpen={isEdit} handleClose={(e) => showEditModal(e)}>
          <WordModal handleClose={(e) => showEditModal(e)} word={word} />
        </Modal>
      )}

      {isDelete && word && (
        <Modal
          className={twMerge(styles['delete-modal'], 'dark:bg-[#0B152E]')}
          isOpen={isDelete}
          handleClose={(e) => showDeleteModal(e)}
        >
          <div className={styles.delete}>
            <h6 className="dark:text-grey-600">{t('really_delete')}</h6>
            <div className={styles.btns}>
              <Button onClick={() => deleteWord(word)}>{t('delete')}</Button>
              <Button
                className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !rounded-md hover:border-red hover:!text-red"
                onClick={(e) => showDeleteModal(e)}
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
