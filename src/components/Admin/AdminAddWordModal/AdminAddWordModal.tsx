'use state'

import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import AdminWordModal from '@/components/Admin/AdminWordModal/AdminWordModal'

export const AdminAddWordModal = () => {
  const [isOpen, setOpen] = useState(false)

  const showModal = () => {
    setOpen((state) => !state)
    removeScrollBar(isOpen)
  }

  return (
    <>
      <div
        className="cursor-pointer text-white-100 bg-blue-200 flex items-center justify-center p-3 rounded-2xl transition-all ease-in-out duration-150
  lg:hover:bg-purple-100 lg:hover:text-white-100 dark:bg-[#1D2D4D]"
        onClick={() => showModal()}
      >
        <FaPlus size={16} />
      </div>
      {isOpen && (
        <Modal className="dark:bg-[#0B152E]" isOpen={isOpen} handleClose={() => showModal()}>
          <AdminWordModal handleClose={() => showModal()} />
        </Modal>
      )}
    </>
  )
}
