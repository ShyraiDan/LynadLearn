'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import Image from 'next/image'
import styles from './AuthModal.module.scss'
import { useTranslations } from 'next-intl'
import { removeScrollBar } from '@/constants/shared'
import SignInForm from './components/SignInForm/SignInForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

import { FcGoogle } from 'react-icons/fc'
import image from '@/assets/keep_your_learning_data.png'

interface IAuthModalProps {
  isModalOpen: boolean
  showModal: () => void
}

export function AuthModal({ isModalOpen, showModal }: IAuthModalProps) {
  const [isSignInModal, setSignInModal] = useState(false)
  const t = useTranslations('Forms')

  const handleShowModal = () => {
    showModal()
    removeScrollBar(isModalOpen)
  }

  return (
    <>
      <Modal className="dark:bg-[#0B152E]" isOpen={isModalOpen} handleClose={handleShowModal}>
        <div className={styles.modal}>
          <div className={styles.image}>
            <Image alt="Keep learning" src={image} />
          </div>
          {isSignInModal ? (
            <div className={styles['form-container']}>
              <h2 className="dark:text-grey-600">{t('hello')}</h2>
              <p className="dark:text-grey-600">{t('enter_details_sign_up')}</p>
              <SignUpForm handleClose={handleShowModal} />
              <span className="dark:text-grey-600">{t('or')}</span>
              <Button>
                <FcGoogle /> {t('sign_up_google')}
              </Button>
              <div className="dark:text-grey-600">
                {t('have_account')}
                <span onClick={() => setSignInModal((state) => !state)}>{t('sign_in')}</span>
              </div>
            </div>
          ) : (
            <div className={styles['form-container']}>
              <h2 className="dark:text-grey-600">{t('welcome')}</h2>
              <p className="dark:text-grey-600">{t('enter_details_sign_in')}</p>
              <SignInForm handleClose={showModal} />
              <div className="dark:text-grey-600">
                {t('not_have_account')}
                <span onClick={() => setSignInModal((state) => !state)}>{t('sign_up')}</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
