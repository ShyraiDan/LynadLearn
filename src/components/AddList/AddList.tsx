'use client'

import styles from './AddList.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { removeScrollBar } from '@/constants/shared'
import { Modal } from '../ui/Modal/Modal'
import { Input } from '../ui/Input/Input'
import { Button } from '../ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IList } from '@/interfaces/List.interface'
import { createList } from '@/lib/lists'

import { FaPlus } from 'react-icons/fa'

export default function AddList() {
  const [isAdding, setAdding] = useState(false)
  const t = useTranslations('dashboard.lists')

  const openModal = () => {
    setAdding((state) => !state)
    removeScrollBar(isAdding)
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IList>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IList> = async (values) => {
    console.log(values)
    await createList(values)
  }

  return (
    <>
      <div className={styles.container} onClick={() => openModal()}>
        <div className={styles.photo}>
          <FaPlus />
        </div>
        <p>{t('add_list')}</p>
      </div>

      {isAdding && (
        <Modal isOpen={isAdding} className={styles['add-list']} handleClose={() => openModal()}>
          <form className={styles['list-form']} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.photo} ${styles['add-photo']}`}>
              <FaPlus />
            </div>
            <Input
              type='text'
              name='title'
              id='title'
              placeholder={t('enter_list_name')}
              obj={register('title', {
                required: { value: true, message: t('list_name_required') },
                minLength: { value: 3, message: t('list_name_minLength') },
                maxLength: { value: 30, message: t('list_name_maxLength') }
              })}>
              {t('list_name')}
            </Input>
            {errors?.title && <p className={styles.error}>{errors.title.message}</p>}
            <Button type='submit'>{t('create_list')}</Button>
          </form>
        </Modal>
      )}
    </>
  )
}
