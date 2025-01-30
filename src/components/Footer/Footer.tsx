'use client'

import styles from './Footer.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'

export function Footer() {
  const t = useTranslations('Header')

  const path = usePathname()

  return (
    <>
      <footer
        className={twMerge(
          styles.footer,
          path?.split('/')[2] === 'dashboard' && styles.dashboard,
          'dark:bg-blue-800 dark:border-[#1D2D4D]'
        )}
      >
        <div className={styles['footer-container']}>
          <div className={styles['footer-main']}>
            <NavigationLink href={'/'}>
              <span className={styles.logo}>Lynad</span>
              <span>Learn</span>
            </NavigationLink>
            <div className={styles['footer-center']}>
              <div className={styles['footer-left']}>
                <nav>
                  <ul className={styles['nav-list']}>
                    <li className={styles['nav-item']}>
                      <NavigationLink href="/about-us">{t('about_us')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href="/pricing">{t('pricing')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href="/contact-us">{t('contact_us')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href="/mobile-app">{t('mobile_app')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href="/dictionary">{t('dictionary')}</NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href="/translator">{t('translator')}</NavigationLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className={styles['footer-right']}>
                <p className="dark:text-grey-600">{t('follow_us')}</p>
                <ul>
                  <li>
                    <Link
                      href={'https://www.instagram.com/'}
                      className="dark:text-grey-600 hover:text-purple-100 dark:hover:text-purple-100"
                    >
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'https://twitter.com/'}
                      className=" dark:text-grey-600 hover:text-purple-100 dark:hover:text-purple-100"
                    >
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'https://www.facebook.com/'}
                      className="dark:text-grey-600 hover:text-purple-100 dark:hover:text-purple-100"
                    >
                      <FaFacebook />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles['footer-bottom']} dark:text-grey-600`}>
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
