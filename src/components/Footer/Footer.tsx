'use client'

import styles from './Footer.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'

export function Footer() {
  const t = useTranslations('Header')

  const path = usePathname()

  // TODO
  // Add hover on footer icons
  // Check icons styles on mobile

  return (
    <>
      <footer className={`${styles.footer} ${path.split('/')[2] === 'dashboard' && styles.dashboard} dark:bg-blue-800`}>
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
                      <NavigationLink href='/about-us' className='dark:text-grey-600'>
                        {t('about_us')}
                      </NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/pricing' className='dark:text-grey-600'>
                        {t('pricing')}
                      </NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/contact-us' className='dark:text-grey-600'>
                        {t('contact_us')}
                      </NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/mobile-app' className='dark:text-grey-600'>
                        {t('mobile_app')}
                      </NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/dictionary' className='dark:text-grey-600'>
                        {t('dictionary')}
                      </NavigationLink>
                    </li>
                    <li className={styles['nav-item']}>
                      <NavigationLink href='/translator' className='dark:text-grey-600'>
                        {t('translator')}
                      </NavigationLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className={styles['footer-right']}>
                <p className='dark:text-grey-600'>{t('follow_us')}</p>
                <ul>
                  <li>
                    <Link href={'https://www.instagram.com/'}>
                      <FaInstagram className='dark:text-grey-600' />
                    </Link>
                  </li>
                  <li>
                    <Link href={'https://twitter.com/'}>
                      <FaXTwitter className='dark:text-grey-600' />
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
