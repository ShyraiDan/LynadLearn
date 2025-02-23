'use client'

import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { H6 } from '@/components/ui/Typography/Typography'
import Button from '@/components/ui/Button/Button'
import { removeScrollBar } from '@/constants/shared'
import { deleteSingleAchievements } from '@/lib/achievements'
import { toast } from 'sonner'

interface AdminAchievementsDeleteProps {
  id: string
}

export const AdminAchievementsDelete = ({ id }: AdminAchievementsDeleteProps) => {
  const [isOpen, setOpen] = useState(false)

  const showModal = () => {
    setOpen((state) => !state)
    removeScrollBar(isOpen)
  }

  const handleDeleteAchievement = (id: string) => {
    deleteSingleAchievements(id).then((res) => {
      if (res.success) {
        toast.success('Grammar topic removed', {
          duration: 3000,
          className: 'border text-white-100 border-green-100 bg-green-100'
        })

        showModal()
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
        className="cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-red dark:hover:fill-red"
        onClick={showModal}
      />
      <Modal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        className="sm:h-[200px] sm:w-[475px] sm:self-center sm:justify-self-center dark:bg-[#0B152E]"
      >
        <div className="flex flex-col justify-center items-center">
          <H6 className="text-xl text-center font-bold mb-5 dark:text-grey-600">
            Are you sure you want to delete this achievement?
          </H6>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button className="!rounded" type="button" onClick={() => handleDeleteAchievement(id)}>
              Delete
            </Button>
            <Button
              className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red"
              onClick={() => showModal()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
