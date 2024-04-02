'use client'

import styles from './AddList.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { removeScrollBar } from '@/constants/shared'
import { Modal } from '../ui/Modal/Modal'
import { Input } from '../ui/Input/Input'
import { Button } from '../ui/Button/Button'

import { FaPlus } from 'react-icons/fa'

export default function AddList() {
  const [isAdding, setAdding] = useState(false)
  const t = useTranslations('dashboard.lists')

  const openModal = () => {
    setAdding((state) => !state)
    removeScrollBar(isAdding)
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
          <form className={styles['list-form']}>
            <div className={`${styles.photo} ${styles['add-photo']}`}>
              <FaPlus />
            </div>
            <Input required type='text' name='listName' id='listName' placeholder={'Enter list name'}>
              List name
            </Input>
            <Button type='submit'>Create list</Button>
          </form>
        </Modal>
      )}
    </>
  )
}
