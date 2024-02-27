'use client'

import { useState } from 'react'
import { Modal } from '../ui/Modal/Modal'
import { Button } from '../ui/Button/Button'
import { Input } from '../ui/Input/Input'
import Image from 'next/image'
import styles from './SignInModal.module.scss'

import { FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import image from '@/assets/keep_your_learning_data.png'

export function SignInModal() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSignUpModal, setSignUpModal] = useState(false)

  return (
    <>
      <div className={styles.btn}>
        <Button onClick={() => setModalOpen(!isModalOpen)}>
          <FaUser /> Sign in
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={() => setModalOpen(!isModalOpen)}>
          <div className={styles.modal}>
            <div className={styles.image}>
              <Image alt='Keep learning' src={image} />
            </div>
            {isSignUpModal ? (
              <div className={styles['form-container']}>
                <h2>Hello!</h2>
                <p>Please enter your details to sign up.</p>
                <form action='' className={styles.form}>
                  <Input type='email' name='email' id='email' placeholder='Enter your email address'>
                    Email
                  </Input>
                  <Input type='text' name='userName' id='userName' placeholder='Enter your user name'>
                    User name
                  </Input>
                  <Input type='password' name='password' id='password' placeholder='Enter your password'>
                    Password
                  </Input>
                  <Input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='Confirm your password'>
                    Confirm password
                  </Input>
                  <Button type='submit'>Sign up</Button>
                </form>
                <span>or</span>
                <Button>
                  <FcGoogle /> Sign in with Goggle
                </Button>
                <div>
                  Do you already have an account?
                  <span onClick={() => setSignUpModal((state) => !state)}>Sign in</span>
                </div>
              </div>
            ) : (
              <div className={styles['form-container']}>
                <h2>Welcome back!</h2>
                <p>Please enter your details to sign in.</p>
                <form action='' className={styles.form}>
                  <Input type='email' name='email' id='email' placeholder='Enter your email address'>
                    Email
                  </Input>
                  <Input type='password' name='password' id='password' placeholder='Enter your password'>
                    Password
                  </Input>
                  <Button type='submit'>Sign in</Button>
                </form>
                <div>
                  Don&apos;t have an account yet?
                  <span onClick={() => setSignUpModal((state) => !state)}>Sign up</span>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
