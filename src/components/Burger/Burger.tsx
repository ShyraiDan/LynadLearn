'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Burger.module.scss'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { AuthModal } from '../AuthModal/AuthModal'
import { removeScrollBar } from '@/constants/shared'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'
import { IoIosArrowDown } from 'react-icons/io'

export default function Burger() {
  const t = useTranslations('Header')
  const [isBurgerShow, setBurgerShow] = useState(false)
  const [isLastOpen, setLastOpen] = useState(false)
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
              <NavigationLink hover onClick={() => showModal()} href={'/settings'}>
                Settings
              </NavigationLink>
            </li>
            {isAuth && (
              <li>
                <NavigationLink hover onClick={() => showModal()} href={'/dashboard/profile'}>
                  Profile
                </NavigationLink>
              </li>
            )}
            <li onClick={() => setLastOpen((state) => !state)}>
              <div className={styles['dropdown-btn']}>
                <NavigationLink hover onClick={() => showModal()} href={'/dashboard/lists'}>
                  {t('dashboard')}
                </NavigationLink>

                <IoIosArrowDown size={20} className={`${styles.arrow} ${isLastOpen && styles.rotated}`} />
              </div>
              <ul className={`${styles.dropdown}  ${isLastOpen && styles['dropdown-active']}`}>
                <li>
                  <NavigationLink hover onClick={() => showModal()} href={'/dashboard/quiz'}>
                    Quiz
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink hover onClick={() => showModal()} href={'/dashboard/grammar'}>
                    Grammar
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink hover onClick={() => showModal()} href={'/dashboard/flashcard'}>
                    Flashcard
                  </NavigationLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.auth}>{!isAuth && <AuthModal />}</div>
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
