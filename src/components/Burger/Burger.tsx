'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Burger.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { removeScrollBar } from '@/constants/shared'
import { logout } from '@/lib/auth'
import Button from '@/components/ui/Button/Button'
import { twMerge } from 'tailwind-merge'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'
import { IoIosArrowDown } from 'react-icons/io'

export default function Burger({ isAuth }: { isAuth: boolean }) {
  const t = useTranslations('Header')
  const [isBurgerShow, setBurgerShow] = useState(false)
  const [isLastOpen, setLastOpen] = useState(false)

  const showModal = () => {
    setBurgerShow((state) => !state)
    removeScrollBar(isBurgerShow)
  }

  return (
    <>
      <div onClick={() => showModal()} className={styles['burger-btn']}>
        <span className='dark:bg-grey-600'></span>
        <span className='dark:bg-grey-600'></span>
        <span className='dark:bg-grey-600'></span>
      </div>
      <div className={`${isBurgerShow && styles.layout} `} />
      <div className={`${styles.burger} ${isBurgerShow && styles.active} dark:bg-blue-600`}>
        <div className={styles.top}>
          <div>
            <h2>
              <NavigationLink href='/' onClick={() => showModal()}>
                Lynad<span>Learn</span>
              </NavigationLink>
            </h2>
            <RxCross1 className='dark:text-grey-600' onClick={() => showModal()} size={'24px'} />
          </div>
          <ul>
            <li>
              <NavigationLink className='dark:text-grey-600' hover onClick={() => showModal()} href={'/about-us'}>
                {t('about_us')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink className='dark:text-grey-600' hover onClick={() => showModal()} href={'/pricing'}>
                {t('pricing')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink className='dark:text-grey-600' hover onClick={() => showModal()} href={'/contact-us'}>
                {t('contact_us')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink className='dark:text-grey-600' hover onClick={() => showModal()} href={'/mobile-app'}>
                {t('mobile_app')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink className='dark:text-grey-600' hover onClick={() => showModal()} href={'/dictionary'}>
                {t('dictionary')}
              </NavigationLink>
            </li>
            <li>
              <NavigationLink className='dark:text-grey-600' hover onClick={() => showModal()} href={'/translator'}>
                {t('translator')}
              </NavigationLink>
            </li>
            {/* <li>
              <NavigationLink hover onClick={() => showModal()} href={'/settings'}>
                {t('settings')}
              </NavigationLink>
            </li> */}
            {isAuth && (
              <li>
                <NavigationLink
                  className='dark:text-grey-600'
                  hover
                  onClick={() => showModal()}
                  href={'/dashboard/profile'}>
                  {t('profile')}
                </NavigationLink>
              </li>
            )}
            {isAuth && (
              <li>
                <NavigationLink
                  className='dark:text-grey-600'
                  hover
                  onClick={() => showModal()}
                  href={'/dashboard/bookmarks'}>
                  {t('bookmarks')}
                </NavigationLink>
              </li>
            )}
            <li>
              <div className={styles['dropdown-btn']}>
                <NavigationLink
                  className='dark:text-grey-600'
                  hover
                  onClick={() => showModal()}
                  href={'/dashboard/lists'}>
                  {t('dashboard')}
                </NavigationLink>
                <IoIosArrowDown
                  size={20}
                  onClick={() => setLastOpen((state) => !state)}
                  className={twMerge(styles.arrow, isLastOpen && styles.rotated, 'cursor-pointer dark:text-grey-600')}
                />
              </div>
              <ul className={`${styles.dropdown}  ${isLastOpen && styles['dropdown-active']}`}>
                <li>
                  <NavigationLink
                    className='dark:text-grey-600'
                    hover
                    onClick={() => showModal()}
                    href={'/dashboard/quiz?type=grammar'}>
                    {t('quiz')}
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    className='dark:text-grey-600'
                    hover
                    onClick={() => showModal()}
                    href={'/dashboard/grammar'}>
                    {t('grammar')}
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    className='dark:text-grey-600'
                    hover
                    onClick={() => showModal()}
                    href={'/dashboard/flashcard'}>
                    {t('flashcard')}
                  </NavigationLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.bottom}>
          <div className={styles.auth}>
            {isAuth ? (
              <Button className={styles.logout} onClick={() => logout()}>
                {t('logout')}
              </Button>
            ) : (
              <AuthModal />
            )}
          </div>
          <div className={styles.social}>
            <p className='dark:text-grey-600'>{t('follow_us')}</p>
            <ul>
              <li>
                <Link href={'https://www.instagram.com/'}>
                  <FaInstagram className='dark:text-grey-600' />
                </Link>
              </li>
              <li>
                <Link href={'https://twitter.com/'}>
                  <FaXTwitter className='dark:text-grey-600 ' />
                </Link>
              </li>
              <li>
                <Link href={'https://www.facebook.com/'}>
                  <FaFacebook className='dark:text-grey-600' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
