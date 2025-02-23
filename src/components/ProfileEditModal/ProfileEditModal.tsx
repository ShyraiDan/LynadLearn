'use client'

import styles from './ProfileEditModal.module.scss'
import { useRef, useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IUser } from '@/interfaces/User.interface'
import { Input } from '@/components/ui/Input/Input'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button/Button'
import { removeScrollBar } from '@/constants/shared'
import { updateUser } from '@/lib/auth'
import { ISession } from '@/lib/auth'
import { twMerge } from 'tailwind-merge'
import { H3, H5, P } from '@/components/ui/Typography/Typography'
import { saveFileToBucket } from '@/lib/bucket'
import Image from 'next/image'

import { MdModeEdit } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

export default function ProfileEditModal({ session }: { session: ISession }) {
  const t = useTranslations('Forms')
  const [showEditModal, setShowEditModal] = useState(false)
  const [isFileUploaded, setFileUploaded] = useState(false)
  const [fileName, setFileName] = useState(session.avatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IUser>({
    mode: 'onSubmit',
    defaultValues: {
      userName: session.userName,
      description: session.description,
      location: session.location
    }
  })

  const openEditModal = () => {
    setShowEditModal((state) => !state)
    removeScrollBar(showEditModal)
  }

  const onSubmit: SubmitHandler<IUser> = async (values) => {
    if (fileName) {
      await updateUser({ ...values, avatarUrl: fileName })
    } else {
      await updateUser({ ...values, avatarUrl: session.avatarUrl })
    }

    openEditModal()
  }

  return (
    <>
      <div className={twMerge(styles['edit-profile'], 'dark:bg-[#1D2D4D]')} onClick={() => openEditModal()}>
        <MdModeEdit className="dark:fill-grey-600" />
      </div>

      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          className={twMerge(styles['edit-modal'], 'dark:bg-[#0B152E]')}
          handleClose={() => openEditModal()}
        >
          <H3 className="text-2xl font-bold mb-5">{t('edit_profile')}</H3>
          <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-end">
              <div className={twMerge(styles['user-photo'], 'dark:bg-[#1D2D4D]')}>
                {fileName ? (
                  <Image
                    alt=""
                    width={80}
                    height={80}
                    className="w-full h-full rounded-full"
                    unoptimized
                    src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`}
                  />
                ) : (
                  <FaUser className="dark:fill-grey-600" />
                )}
                {!isFileUploaded && (
                  <div className={styles.edit}>
                    <MdModeEdit
                      className="dark:fill-grey-600"
                      onClick={() => {
                        setFileUploaded(true)
                      }}
                    />
                  </div>
                )}
              </div>
              {isFileUploaded && (
                <div className="flex items-center ml-4 gap-3">
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }}
                  >
                    Upload
                  </Button>
                  <Button
                    outline
                    className="!border-red !text-red"
                    onClick={() => {
                      setFileName(session.avatarUrl)
                      setFileUploaded(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const fileName = await saveFileToBucket(e.target.files![0], e.target.files![0]?.name)
                      setFileName(fileName)
                    }}
                  />
                </div>
              )}
            </div>
            <H5 className="text-xl font-bold my-3 dark:text-grey-600">{t('personal_info')}</H5>
            <div className={styles['input-container']}>
              <Input
                type="text"
                name="userName"
                id="userName"
                placeholder={t('enter_your_name')}
                obj={register('userName', {
                  required: { value: true, message: t('name_required') },
                  minLength: { value: 3, message: t('name_minLength') },
                  maxLength: { value: 20, message: t('name_maxLength') }
                })}
              >
                {t('name')}
              </Input>
              {errors?.userName && <P className="text-red text-sm mt-1 dark:!text-red">{errors.userName.message}</P>}
            </div>
            <div className={styles['input-container']}>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder={t('enter_your_description')}
                obj={register('description')}
              >
                {t('description')}
              </Input>
              {errors?.description && (
                <P className="text-red text-sm mt-1 dark:!text-red">{errors.description.message}</P>
              )}
            </div>
            <div className={styles['input-container']}>
              <Input
                type="text"
                name="location"
                id="location"
                placeholder={t('enter_your_location')}
                obj={register('location')}
              >
                {t('location')}
              </Input>
              {errors?.location && <P className="text-red text-sm mt-1 dark:!text-red">{errors.location.message}</P>}
            </div>
            <Button type="submit">{t('save')}</Button>
          </form>
        </Modal>
      )}
    </>
  )
}
