'use client'

import styles from './AddList.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { removeScrollBar } from '@/constants/shared'
import { Modal } from '@/components/ui/Modal/Modal'
import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IList } from '@/interfaces/List.interface'
import { createList } from '@/lib/lists'
import { getSession } from '@/lib/auth'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { twMerge } from 'tailwind-merge'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { RequireAuthModal } from '@/components/RequireAuthModal/RequireAuthModal'
import { P } from '@/components/ui/Typography/Typography'

import { FaPlus } from 'react-icons/fa'

export default function AddList() {
  const [isAdding, setAdding] = useState(false)
  const [isAuthRequireModal, setAuthRequireModal] = useState(false)
  const [isAuthModal, setAuthModal] = useState(false)
  const t = useTranslations('dashboard.lists')

  const openModal = async () => {
    const session = await getSession()
    if (session.isLoggedIn) {
      setAdding((state) => !state)
      removeScrollBar(isAdding)
    } else {
      setAuthRequireModal(true)
      removeScrollBar(isAuthRequireModal)
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IList>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<IList> = async (values) => {
    console.log(values)
    await createList(values)
    toast.success(t('list_created'), { duration: 3000, className: styles.correct })

    openModal()
  }

  const handleClose = () => {
    setAuthRequireModal(false)
    removeScrollBar(isAuthRequireModal)
  }

  return (
    <>
      <div>
        <div className={styles.container} onClick={() => openModal()}>
          <div className={twMerge(styles.photo, 'dark:bg-[#233869] dark:shadow-lg')}>
            <FaPlus />
          </div>
          <P className="w-[100px] text-[1rem] text-center cursor-pointer sm:w-[135px]">{t('add_list')}</P>
        </div>
        <SnackBar />
      </div>
      <RequireAuthModal
        isOpen={isAuthRequireModal}
        handleClose={handleClose}
        allowedAction={() => {
          setAuthModal(true)
          handleClose()
        }}
      >
        <P className="text-[1rem] text-center font-bold">In order to add list you must sign in to your account</P>
      </RequireAuthModal>

      <AuthModal isModalOpen={isAuthModal} showModal={() => setAuthModal((state) => !state)} />

      {isAdding && (
        <Modal
          isOpen={isAdding}
          className={twMerge(styles['add-list'], 'dark:bg-[#0B152E]')}
          handleClose={() => openModal()}
        >
          <form className={styles['list-form']} onSubmit={handleSubmit(onSubmit)}>
            <div className={twMerge(styles.photo, styles['add-photo'], 'dark:bg-[#233869] dark:shadow-lg')}>
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
            <Button type="submit">{t('create_list')}</Button>
          </form>
        </Modal>
      )}
    </>
  )
}
