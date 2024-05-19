'use client'

import styles from './ProfileEditModal.module.scss'
import { useState } from 'react'
import { Modal } from '../ui/Modal/Modal'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IUser } from '@/interfaces/User.interface'
import { Input } from '../ui/Input/Input'
import { useTranslations } from 'next-intl'
import { Button } from '../ui/Button/Button'

import { MdModeEdit } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

export default function ProfileEditModal() {
  const t = useTranslations('Forms')
  const [showEditModal, setShowEditModal] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IUser>({
    mode: 'onBlur'
  })

  const openEditModal = () => {
    setShowEditModal((state) => !state)
  }

  const onSubmit: SubmitHandler<IUser> = async (values) => {
    console.log(values)
  }

  return (
    <>
      <div className={styles['edit-profile']} onClick={() => openEditModal()}>
        <MdModeEdit />
      </div>

      {showEditModal && (
        <Modal isOpen={showEditModal} className={styles['edit-modal']} handleClose={() => openEditModal()}>
          <h3 className={styles.title}>Edit Profile</h3>
          <form action='' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.photo}>
              <div className={styles['user-photo']}>
                <FaUser />
                <div className={styles.edit}>
                  <MdModeEdit />
                </div>
              </div>
            </div>
            <h5 className={styles.subtitle}>Personal info</h5>
            <div className={styles['input-container']}>
              <Input
                type='text'
                name='userName'
                id='userName'
                placeholder={''}
                obj={register('userName', {
                  required: { value: true, message: t('name_required') },
                  minLength: { value: 3, message: t('name_minLength') },
                  maxLength: { value: 20, message: t('name_maxLength') }
                })}>
                Name
              </Input>
              {errors?.userName && <p className={styles.error}>{errors.userName.message}</p>}
            </div>
            <div className={styles['input-container']}>
              <Input
                type='text'
                name='description'
                id='description'
                placeholder={''}
                obj={register('description', {
                  required: { value: true, message: t('name_required') }
                })}>
                Description
              </Input>
              {errors?.description && <p className={styles.error}>{errors.description.message}</p>}
            </div>
            <div className={styles['input-container']}>
              <Input
                type='text'
                name='location'
                id='location'
                placeholder={''}
                obj={register('location', {
                  required: { value: true, message: t('name_required') }
                })}>
                Location
              </Input>
              {errors?.location && <p className={styles.error}>{errors.location.message}</p>}
            </div>
            <Button type='submit'>Save</Button>
          </form>
        </Modal>
      )}
    </>
  )
}
