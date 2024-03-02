import styles from './Header.module.scss'
import LanguageModal from '../LanguageModal/LanguageModal'
import { SignInModal } from '../SignInModal/SignInModal'
import Burder from '../Burger/Burder'
import { UserModal } from '../UserModal/UserModal'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations('Header')
  const isAuth = false

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div></div>
        <NavigationLink href={'/'}>LynadLearn</NavigationLink>
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
              <NavigationLink href={'/dashboard/lists'}>{t('dashboard')}</NavigationLink>
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
