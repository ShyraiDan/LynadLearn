import Link from 'next/link'
import styles from './Burger.module.scss'

import { FaUser } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { MdLogin } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

export default function Burder() {
  const isShow = false
  const isAuth = false

  return (
    <>
      <div className={styles['burger-btn']}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`${styles.burger} ${isShow && styles.active}`}>
        <div className={styles.top}>
          <div>
            <h2>LynadLearn</h2>
            <RxCross1 size={'24px'} />
          </div>
          <ul>
            <li>
              <Link href={'/about-us'}>About us</Link>
            </li>
            <li>
              <Link href={'/pricing'}>Pricing</Link>
            </li>
            <li>
              <Link href={'/contact-us'}>Contact Us</Link>
            </li>
            <li>
              <Link href={'/dashboard/lists'}>Dashboard</Link>
            </li>

            {isAuth && (
              <li>
                <Link href={'/profile'}>Profile</Link>
              </li>
            )}
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.auth}>
            <button>
              <FaUser />
              Sign In
            </button>
            <button>
              <MdLogin />
              Sign Up
            </button>
          </div>
          <div className={styles.social}>
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
    </>
  )
}
