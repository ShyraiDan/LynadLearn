'use client'

import { useState } from 'react'
import { Modal } from '../ui/Modal/Modal'
import { Button } from '../ui/Button/Button'
import { Input } from '../ui/Input/Input'
import Image from 'next/image'
import styles from './SignInModal.module.scss'
import { useTranslations } from 'next-intl'
import { removeScrollBar } from '@/constants/shared'

import { FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import image from '@/assets/keep_your_learning_data.png'

export function SignInModal() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSignUpModal, setSignUpModal] = useState(false)
  const t = useTranslations('Forms')

  const showModal = () => {
    setModalOpen((state) => !state)
    removeScrollBar(isModalOpen)
  }

  return (
    <>
      <div className={styles.btn}>
        <Button onClick={() => showModal()}>
          <FaUser /> {t('sign_in')}
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={() => showModal()}>
          <div className={styles.modal}>
            <div className={styles.image}>
              <Image alt='Keep learning' src={image} />
            </div>
            {isSignUpModal ? (
              <div className={styles['form-container']}>
                <h2>{t('hello')}</h2>
                <p>{t('enter_details_sign_up')}</p>
                <form action='' className={styles.form}>
                  <Input required type='email' name='email' id='email' placeholder={t('enter_your_email')}>
                    {t('email')}
                  </Input>
                  <Input required type='text' name='userName' id='userName' placeholder={t('enter_your_name')}>
                    {t('user_name')}
                  </Input>
                  <Input required type='password' name='password' id='password' placeholder={t('enter_password')}>
                    {t('password')}
                  </Input>
                  <Input
                    required
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder={t('confirm_your_password')}>
                    {t('confirm_password')}
                  </Input>
                  <Button type='submit'>{t('sign_up')}</Button>
                </form>
                <span>{t('or')}</span>
                <Button>
                  <FcGoogle /> {t('sign_up_google')}
                </Button>
                <div>
                  {t('have_account')}
                  <span onClick={() => setSignUpModal((state) => !state)}>{t('sign_in')}</span>
                </div>
              </div>
            ) : (
              <div className={styles['form-container']}>
                <h2>{t('welcome')}</h2>
                <p>{t('enter_details_sign_in')}</p>
                <form action='' className={styles.form}>
                  <Input required type='email' name='email' id='email' placeholder={t('enter_your_email')}>
                    {t('email')}
                  </Input>
                  <Input required type='password' name='password' id='password' placeholder={t('enter_password')}>
                    {t('password')}
                  </Input>
                  <Button type='submit'>{t('sign_in')}</Button>
                </form>
                <div>
                  {t('not_have_account')}
                  <span onClick={() => setSignUpModal((state) => !state)}>{t('sign_up')}</span>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
