'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { Input } from '@/components/ui/Input/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IList } from '@/interfaces/List.interface'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { H6, P } from '@/components/ui/Typography/Typography'
import { useParams } from 'next/navigation'
import { updateListById, deleteListById } from '@/lib/lists'
import { useRouter } from '@/navigation'

import { MdMoreVert } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

interface ManageListModalProps {
  listId: string
}

export const ManageListModal = ({ listId }: ManageListModalProps) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const t = useTranslations('dashboard.lists')
  const { locale } = useParams()
  const router = useRouter()

  const { data: list } = useSWR<IList>(`/api/list/${listId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<IList>({
    mode: 'onSubmit',
    defaultValues: {
      title: list?.title ?? ''
    }
  })

  useEffect(() => {
    if (list) {
      setValue('title', list.title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  const handleOpenEditModal = () => {
    setEditModalOpen(true)
    setOpen(false)
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true)
    setOpen(false)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const onSubmit: SubmitHandler<IList> = async (values) => {
    const res = await updateListById(listId, values)

    if (res.success) {
      toast.success(t('successfully_updated'), {
        duration: 3000,
        className: 'border border-green-100 bg-green-100 text-white-100'
      })

      handleCloseEditModal()
    } else {
      toast.error(t('error_updating'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

  const handleDeleteList = async () => {
    const res = await deleteListById(listId)

    if (res.success) {
      toast.success(t('successfully_deleted'), {
        duration: 3000,
        className: 'border border-green-100 bg-green-100 text-white-100'
      })
      router.push('/dashboard/lists')
    } else {
      toast.error(t('error_deleting'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

  return (
    <>
      <div className="relative">
        <Button
          ref={buttonRef}
          className="h-10 w-10 !p-2 !rounded-2xl dark:bg-[#1D2D4D]"
          onClick={() => setOpen((prev) => !prev)}
        >
          <MdMoreVert size={20} />
        </Button>

        {open && (
          <ul
            ref={menuRef}
            className={twMerge(
              'z-10 rounded-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] bg-white-100 absolute top-[45px] right-[0px] dark:bg-[#1D2D4D] p-2',
              locale === 'en' ? 'w-[100px]' : 'w-[165px]'
            )}
          >
            <li className="cursor-pointer flex items-center gap-2 dark:text-grey-600" onClick={handleOpenEditModal}>
              {t('edit_list')}
            </li>
            <li className="cursor-pointer flex items-center gap-2 dark:text-grey-600" onClick={handleOpenDeleteModal}>
              {t('delete_list')}
            </li>
          </ul>
        )}
      </div>

      {list && (
        <Modal
          isOpen={isEditModalOpen}
          className="sm:h-[410px] sm:w-[300px] sm:self-center sm:justify-self-center dark:bg-[#0B152E]"
          handleClose={() => handleCloseEditModal()}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="border border-[#00000020] cursor-pointer text-[#bcc1c6] border-dashed my-2 w-full mb-5 h-[100px] rounded-xl flex items-center justify-center font-bold transition-all ease-linear duration-150 sm:h-[135px]
            lg:hover:text-purple-100 lg:hover:border-purple-100  
            dark:bg-[#233869] dark:shadow-lg"
            >
              <FaPlus />
            </div>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder={t('enter_list_name')}
              obj={register('title', {
                required: { value: true, message: t('list_name_required') },
                minLength: { value: 3, message: t('list_name_minLength') },
                maxLength: { value: 30, message: t('list_name_maxLength') }
              })}
            >
              {t('list_name')}
            </Input>
            {errors?.title && <P className="text-red mt-1.5 text-sm dark:!text-red">{errors.title.message}</P>}
            <Button className="!rounded-lg w-full mt-3" type="submit">
              {t('save')}
            </Button>
          </form>
        </Modal>
      )}

      {list && (
        <Modal
          className="sm:h-[200px] sm:w-[475px] sm:self-center sm:justify-self-center dark:bg-[#0B152E]"
          isOpen={isDeleteModalOpen}
          handleClose={() => handleCloseDeleteModal()}
        >
          <div className="flex flex-col justify-center items-center">
            <H6 className="text-xl text-center font-bold mb-5">{t('really_delete')}</H6>
            <div className="grid grid-cols-2 w-full gap-4">
              <Button className="!rounded-md" onClick={() => handleDeleteList()}>
                {t('delete')}
              </Button>
              <Button
                className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !rounded-md lg:hover:border-red lg:hover:!text-red dark:border-white-100 dark:!text-white-100"
                onClick={() => handleCloseDeleteModal()}
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <SnackBar />
    </>
  )
}
