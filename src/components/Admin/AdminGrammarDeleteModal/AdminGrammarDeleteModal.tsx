'use client'

import Button from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { deleteSingleGrammar } from '@/lib/grammar'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { useRouter } from 'next/navigation'

export const AdminGrammarDeleteModal = ({ id }: { id: string }) => {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  const showModal = () => {
    setOpen((state) => !state)
    removeScrollBar(isOpen)
  }

  const handleDeleteGrammar = (id: string) => {
    deleteSingleGrammar(id).then((res) => {
      if (res.success) {
        toast.success('Grammar topic removed', {
          duration: 3000,
          className: 'border text-white-100 border-green-100 bg-green-100'
        })

        showModal()
        router.back()
      } else {
        toast.success('Error removing grammar topic', {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    })
  }

  return (
    <>
      <FaTrash
        size={14}
        onClick={() => showModal()}
        className='cursor-pointer duration-150 transition-all ease-in dark:fill-white-100 hover:fill-red dark:hover:fill-red'
      />

      <Modal
        isOpen={isOpen}
        className='sm:h-[200px] sm:w-[475px] sm:self-center sm:justify-self-center dark:bg-[#0B152E]'
        handleClose={() => showModal()}>
        <div className='flex flex-col justify-center items-center'>
          <h6 className='text-xl text-center font-bold mb-5 dark:text-grey-600'>
            Are you sure you want to delete this grammar topic?
          </h6>
          <div className='grid grid-cols-2 gap-4 w-full'>
            <Button className='!rounded' type='button' onClick={() => handleDeleteGrammar(id)}>
              Delete
            </Button>
            <Button
              className='!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md hover:border-red hover:!text-red'
              onClick={() => showModal()}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <SnackBar />
    </>
  )
}
