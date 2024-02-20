import Link from 'next/link'
import styles from './Header.module.scss'
import { Button } from '../ui/Button/Button'
// import { useState } from 'react'
import UserModal from '../UserModal/UserModal'
import LanguageModal from '../LanguageModal/LanguageModal'

import { FaUser } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

export function Header() {
  // const [isUserModal, setUserModal] = useState()
  // const [isAuth, setAuth] = useState()
  // const [isLanguageModal, setLanguageModal] = useState()

  const isAuth = true
  const isUserModal = true
  const isLanguageModal = true

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div></div>
        <Link href={'/'}>LynadLearn</Link>
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
            <li className={styles['nav-item']}>
              <Link href={'/dashboard/lists'}>Dashboard</Link>
            </li>
            <li className={styles['nav-item']}>English</li>
            {isLanguageModal && <LanguageModal />}
          </ul>
        </nav>
      </div>
      {isAuth ? (
        <>
          <div>
            <div className={styles.user}>
              <div className={styles['user-avatar']}>
                <FaUser className={styles.icon} />
              </div>
              <IoIosArrowDown className={styles.arrow} />
            </div>
            {isUserModal && <UserModal />}
          </div>
        </>
      ) : (
        <div className={styles['header-right']}>
          <Button>Login</Button>
        </div>
      )}
    </header>
  )
}
