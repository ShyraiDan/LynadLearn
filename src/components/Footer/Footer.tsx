'use client'

import styles from './Footer.module.scss'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'

export function Footer() {
  const t = useTranslations('Header')

  const path = usePathname()

  return (
    <>
      <footer className={`${styles.footer} ${path.split('/')[2] === 'dashboard' && styles.dashboard}`}>
        <div className={styles['footer-container']}>
          <div className={styles['footer-main']}>
            <NavigationLink href={'/'}>
              Lynad<span>Learn</span>
            </NavigationLink>
            <div className={styles['footer-center']}>
              <div className={styles['footer-left']}>
                <nav>
                  <ul className={styles['nav-list']}>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/about-us'>{t('about_us')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/pricing'>{t('pricing')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href={'/contact-us'}>{t('contact_us')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href={'/mobile-app'}>{t('mobile_app')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/dictionary'>{t('dictionary')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/translator'>{t('translator')}</NavigationLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className={styles['footer-right']}>
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
          <div className={styles['footer-bottom']}>
            © Copyright {new Date().getFullYear()}.{' '}
            <Link replace={true} href={'/'}>
              LynadLearn
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
