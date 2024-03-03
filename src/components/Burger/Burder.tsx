'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Burger.module.scss'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { SignInModal } from '../SignInModal/SignInModal'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

export default function Burder() {
  const t = useTranslations('Header')
  const [isBurgerShow, setBurgerShow] = useState(false)
  const isAuth = false

  return (
    <>
      <div onClick={() => setBurgerShow((state) => !state)} className={styles['burger-btn']}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${styles.burger} ${isBurgerShow && styles.active}`}>
        <div className={styles.top}>
          <div>
            <h2>LynadLearn</h2>
            <RxCross1 onClick={() => setBurgerShow((state) => !state)} size={'24px'} />
          </div>
          <ul>
            <li>
              <NavigationLink href={'/about-us'}>{t('about_us')}</NavigationLink>
            </li>
            <li>
              <NavigationLink href={'/pricing'}>{t('pricing')}</NavigationLink>
            </li>
            <li>
              <NavigationLink href={'/contact-us'}>{t('contact_us')}</NavigationLink>
            </li>
            <li>
              <NavigationLink href={'/dashboard/lists'}>{t('dashboard')}</NavigationLink>
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
