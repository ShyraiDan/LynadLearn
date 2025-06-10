'use client'

import { FaTrash } from 'react-icons/fa6'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { H6 } from '@/components/ui/Typography/Typography'
import { deleteDefaultWordById } from '@/lib/defaultWords'
import { useRouter } from 'next/navigation'

interface AdminConfirmDeleteWordModalProps {
  wordId: string
}

export default function AdminConfirmDeleteWordModal({ wordId }: AdminConfirmDeleteWordModalProps) {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  const handleDeleteWord = async (wordId: string) => {
    const result = await deleteDefaultWordById(wordId)
    if (result.success) {
      router.push('/admin/dashboard/vocabulary')
      setOpen(false)
    }
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      <div
        className="cursor-pointer text-white-10 flex items-center justify-center transition-all ease-in-out duration-150 lg:hover:text-white-100 dark:bg-[#1D2D4D]"
        onClick={handleOpenModal}
      >
        <FaTrash className="cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 lg:hover:fill-red dark:lg:hover:fill-red" />
      </div>

      <Modal
        className=" sm:h-[220px] sm:w-[475px] sm:self-center sm:justify-self-center"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
      >
        <div className="mt-6 flex flex-col items-center h-full justify-center">
          <H6 className="text-xl text-center font-bold mb-5 mt-[-35px]">Are you sure you want to delete this word?</H6>
          <div className="grid grid-cols-2 w-full gap-4">
            <Button onClick={() => handleDeleteWord(wordId)} className="!rounded-md">
              Delete
            </Button>
            <Button
              className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !rounded-md lg:hover:border-red lg:hover:!text-red dark:border-white-100 dark:!text-white-100"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
