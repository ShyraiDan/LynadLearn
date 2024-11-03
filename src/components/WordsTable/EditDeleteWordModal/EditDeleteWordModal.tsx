'use client'

import { useState, MouseEvent } from 'react'
import styles from './EditDeleteWordModal.module.scss'
import WordModal from '@/components/WordModal/WordModal'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { deleteWordById } from '@/lib/word'
import { IWord } from '@/interfaces/Word.interface'
import { twMerge } from 'tailwind-merge'

import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

export default function EditDeleteWordModal({ word }: { word: IWord }) {
  const [isEdit, setEdit] = useState(false)
  const [isDelete, setDelete] = useState(false)

  const t = useTranslations('dashboard.vocabulary.modal')

  const showEditModal = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation()
    setEdit((state) => !state)
    removeScrollBar(isEdit)
  }

  const showDeleteModal = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation()
    setDelete((state) => !state)
    removeScrollBar(isDelete)
  }

  const deleteWord = () => {
    word._id && deleteWordById(word._id)
    setDelete((state) => !state)
    removeScrollBar(isDelete)
  }

  return (
    <>
      <div className={styles.modal}>
        <MdEdit onClick={(e) => showEditModal(e)} size={'16px'} />
        <FaTrash onClick={(e) => showDeleteModal(e)} />
      </div>
      {isEdit && (
        <Modal className={'dark:bg-[#0B152E]'} isOpen={isEdit} handleClose={(e) => showEditModal(e)}>
          <WordModal handleClose={(e) => showEditModal(e)} word={word} />
        </Modal>
      )}

      {isDelete && (
        <Modal
          className={twMerge(styles['delete-modal'], 'dark:bg-[#0B152E]')}
          isOpen={isDelete}
          handleClose={(e) => showDeleteModal(e)}>
          <div className={styles.delete}>
            <h6 className='dark:text-grey-600'>{t('really_delete')}</h6>
            <div className={styles.btns}>
              <Button onClick={(e) => showDeleteModal(e)}>{t('cancel')}</Button>
              <Button onClick={() => deleteWord()}>{t('delete')}</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
