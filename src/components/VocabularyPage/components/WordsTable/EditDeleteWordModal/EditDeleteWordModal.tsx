'use client'

import { useState } from 'react'
import styles from './EditDeleteWordModal.module.scss'
import WordModal from '../../WordModal/WordModal'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'

import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

export default function EditDeleteWordModal() {
  const [isEdit, setEdit] = useState(false)
  const [isDelete, setDelete] = useState(false)

  const t = useTranslations('dashboard.vocabulary.modal')

  const showEditModal = () => {
    setEdit((state) => !state)
    removeScrollBar(isEdit)
  }

  const showDeleteModal = () => {
    setDelete((state) => !state)
    removeScrollBar(isDelete)
  }

  const deleteWord = () => {
    showDeleteModal()
  }

  return (
    <>
      <div className={styles.modal}>
        <MdEdit onClick={() => showEditModal()} size={'16px'} />
        <FaTrash onClick={() => showDeleteModal()} />
      </div>
      {isEdit && (
        <Modal isOpen={isEdit} handleClose={() => showEditModal()}>
          <WordModal />
        </Modal>
      )}

      {isDelete && (
        <Modal className={styles['delete-modal']} isOpen={isDelete} handleClose={() => showDeleteModal()}>
          <div className={styles.delete}>
            <h6>{t('really_delete')}</h6>
            <div className={styles.btns}>
              <Button onClick={() => showDeleteModal()}>{t('cancel')}</Button>
              <Button onClick={() => deleteWord()}>{t('delete')}</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
