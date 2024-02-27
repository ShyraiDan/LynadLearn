import Link from 'next/link'
import styles from './Header.module.scss'
import LanguageModal from '../LanguageModal/LanguageModal'
import { SignInModal } from '../SignInModal/SignInModal'
import Burder from '../Burger/Burder'
import { UserModal } from '../UserModal/UserModal'

export function Header() {
  const isAuth = false

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
              <Link href={'/contact-us'}>Contact Us</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href={'/dashboard/lists'}>Dashboard</Link>
            </li>
            <LanguageModal />
          </ul>
        </nav>
      </div>
      <div className={styles['header-right']}>
        {isAuth ? <UserModal /> : <SignInModal />}
        <Burder />
      </div>
    </header>
  )
}
