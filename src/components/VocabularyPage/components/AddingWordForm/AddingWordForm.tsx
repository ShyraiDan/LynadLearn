'use client'

import styles from './AddingWordForm.module.scss'
import { Modal } from '@/components/ui/Modal/Modal'
import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'

import { FaPlus } from 'react-icons/fa'

export const AddingWordForm = () => {
  const [isAdding, setAdding] = useState(false)

  return (
    <>
      <div className={styles.add} onClick={() => setAdding(!isAdding)}>
        <FaPlus fill={'white'} size={16} />
      </div>
      {isAdding && (
        <Modal isOpen={isAdding} handleClose={() => setAdding(!isAdding)}>
          <div className={styles.modal}>
            <h2>Add a new word</h2>
            <p>Enter details of the new word</p>
            <form action='' className={styles.form}>
              <Input required type='text' name='word' id='word' placeholder={'word'}>
                {'word'}
              </Input>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}
