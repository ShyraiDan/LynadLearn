'use client'

import { useState } from 'react'
import { Modal } from '../ui/Modal/Modal'
import { Button } from '../ui/Button/Button'
import styles from './SignInModal.module.scss'

import { FaUser } from 'react-icons/fa'

export function SignInModal() {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div>
        <Button onClick={() => setModalOpen(!isModalOpen)}>
          <FaUser className={styles.icon} /> Sign in
        </Button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={() => setModalOpen(!isModalOpen)}>
          <div className={styles.modal}>
            <div>Modal</div>
          </div>
        </Modal>
      )}
    </>
  )
}
