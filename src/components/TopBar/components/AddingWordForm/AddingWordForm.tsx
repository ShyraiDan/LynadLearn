'use client'

import { useState } from 'react'
import styles from './AddingWordForm.module.scss'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import WordModal from '@/components/WordModal/WordModal'
import { twMerge } from 'tailwind-merge'

import { FaPlus } from 'react-icons/fa'

export const AddingWordForm = () => {
  const [isAdding, setAdding] = useState(false)

  const showModal = () => {
    setAdding((state) => !state)
    removeScrollBar(isAdding)
  }

  return (
    <>
      <div className={twMerge(styles.add, 'dark:bg-[#1D2D4D]')} onClick={() => showModal()}>
        <FaPlus size={16} />
      </div>
      {isAdding && (
        <Modal className='dark:bg-[#0B152E]' isOpen={isAdding} handleClose={() => showModal()}>
          <WordModal handleClose={showModal} />
        </Modal>
      )}
    </>
  )
}
