import styles from './Header.module.scss'
import LanguageModal from '../LanguageModal/LanguageModal'
import { SignInModal } from '../SignInModal/SignInModal'
import Burder from '../Burger/Burder'
import { UserModal } from '../UserModal/UserModal'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

export function Header() {
  const isAuth = false

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div></div>
        <NavigationLink href={'/'}>LynadLearn</NavigationLink>
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
            <li className={styles['nav-item']}>
              <NavigationLink href={'/dashboard/lists'}>Dashboard</NavigationLink>
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
