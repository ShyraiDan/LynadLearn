'use client'

import { useState } from 'react'
import styles from './EditDeleteWordModal.module.scss'
import WordModal from '../../WordModal/WordModal'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'

import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

export default function EditDeleteWordModal() {
  const [isEdit, setEdit] = useState(false)

  const showModal = () => {
    setEdit((state) => !state)
    removeScrollBar(isEdit)
  }

  return (
    <>
      <div className={styles.modal}>
        <MdEdit onClick={() => showModal()} size={'16px'} />
        <FaTrash />
      </div>
      {isEdit && (
        <Modal isOpen={isEdit} handleClose={() => showModal()}>
          <WordModal />
        </Modal>
      )}
    </>
  )
}
