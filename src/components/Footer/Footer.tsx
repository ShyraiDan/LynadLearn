import styles from './Footer.module.scss'
import Link from 'next/link'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles['footer-main']}>
          <Link href={'/'}>LynadLearn</Link>
          <div className={styles['footer-center']}>
            <div className={styles['footer-left']}>
              <nav>
                <ul className={styles['nav-list']}>
                  <li className={styles['nav-item']}>
                    <Link href={'/about-us'}>About us</Link>
                  </li>
                  <li className={styles['nav-item']}>
                    <Link href={'/pricing'}>Pricing</Link>
                  </li>
                  <li className={styles['nav-item']}>
                    <Link href={'/corporate'}>Corporate</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles['footer-right']}>
              <p>Follow us</p>
              <ul>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaXTwitter />
                </li>
                <li>
                  <FaFacebook />
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
