'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Burger.module.scss'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { SignInModal } from '../SignInModal/SignInModal'
import { removeScrollBar } from '@/constants/shared'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

export default function Burger() {
  const t = useTranslations('Header')
  const [isBurgerShow, setBurgerShow] = useState(false)
  const isAuth = false

  const showModal = () => {
    setBurgerShow((state) => !state)
    removeScrollBar(isBurgerShow)
  }

  return (
    <>
      <div onClick={() => showModal()} className={styles['burger-btn']}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`${isBurgerShow && styles.layout}`} />
      <div className={`${styles.burger} ${isBurgerShow && styles.active}`}>
        <div className={styles.top}>
          <div>
            <h2>
              <NavigationLink href='/' onClick={() => showModal()}>
                Lynad<span>Learn</span>
              </NavigationLink>
            </h2>
            <RxCross1 onClick={() => showModal()} size={'24px'} />
          </div>
          <ul>
            <li>
              <NavigationLink hover onClick={() => showModal()} href={'/about-us'}>
                {t('about_us')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink hover onClick={() => showModal()} href={'/pricing'}>
                {t('pricing')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink hover onClick={() => showModal()} href={'/contact-us'}>
                {t('contact_us')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink hover onClick={() => showModal()} href={'/mobile-app'}>
                {t('mobile_app')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink hover onClick={() => showModal()} href={'/dashboard/lists'}>
                {t('dashboard')}
              </NavigationLink>
            </li>

            {isAuth && (
              <li>
                <Link href={'/profile'}>Profile</Link>
              </li>
            )}
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.auth}>{!isAuth && <SignInModal />}</div>
          <div className={styles.social}>
            <p>{t('follow_us')}</p>
            <ul>
              <li>
                <Link href={'https://www.instagram.com/'}>
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link href={'https://twitter.com/'}>
                  <FaXTwitter />
                </Link>
              </li>
              <li>
                <Link href={'https://www.facebook.com/'}>
                  <FaFacebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
