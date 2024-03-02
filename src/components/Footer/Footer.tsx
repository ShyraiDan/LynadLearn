import styles from './Footer.module.scss'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import Link from 'next/link'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles['footer-main']}>
          <NavigationLink href={'/'}>LynadLearn</NavigationLink>
          <div className={styles['footer-center']}>
            <div className={styles['footer-left']}>
              <nav>
                <ul className={styles['nav-list']}>
                  <li className={styles['nav-item']}>
                    <NavigationLink href='/about-us'>About us</NavigationLink>
                  </li>
                  <li className={styles['nav-item']}>
                    <NavigationLink href='/pricing'>Pricing</NavigationLink>
                  </li>
                  <li className={styles['nav-item']}>
                    <NavigationLink href={'/contact-us'}>Contact Us</NavigationLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles['footer-right']}>
              <p>Follow us</p>
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
      </footer>
    </>
  )
}
