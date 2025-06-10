'use client'

import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import { useState } from 'react'
import AdminWordModal from '@/components/Admin/AdminWordModal/AdminWordModal'

import { MdEdit } from 'react-icons/md'
import { IWord } from '@/interfaces/Word.interface'

interface AdminEditWordModalProps {
  word: IWord
}

export const AdminEditWordModal = ({ word }: AdminEditWordModalProps) => {
  const [isOpen, setOpen] = useState(false)

  const showModal = () => {
    setOpen((state) => !state)
    removeScrollBar(isOpen)
  }

  return (
    <>
      <div
        className="cursor-pointer text-white-10 flex items-center justify-center transition-all ease-in-out duration-150 lg:hover:text-purple-100 dark:bg-[#1D2D4D]"
        onClick={() => showModal()}
      >
        <MdEdit size={16} />
      </div>
      {isOpen && (
        <Modal className="dark:bg-[#0B152E]" isOpen={isOpen} handleClose={() => showModal()}>
          <AdminWordModal handleClose={() => showModal()} word={word} />
        </Modal>
      )}
    </>
  )
}
