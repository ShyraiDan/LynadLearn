'use client'

import styles from './Header.module.scss'
import LanguageModal from '../LanguageModal/LanguageModal'
import { SignInModal } from '../SignInModal/SignInModal'
import Burger from '../Burger/Burger'
import { UserModal } from '../UserModal/UserModal'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export function Header() {
  const t = useTranslations('Header')
  const isAuth = false

  const path = usePathname()

  return (
    <header className={styles.header}>
      <div className={`${styles['header-container']} ${path.split('/')[2] === 'dashboard' && styles.dashboard}`}>
        <div className={styles['header-left']}>
          <div></div>
          <NavigationLink href={'/'}>
            Lynad<span>Learn</span>
          </NavigationLink>
          <nav>
            <ul className={styles['nav-list']}>
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href='/about-us'>
                  {t('about_us')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href='/pricing'>
                  {t('pricing')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href={'/contact-us'}>
                  {t('contact_us')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href={'/mobile-app'}>
                  {t('mobile_app')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href={'/dashboard/lists'}>
                  {t('dashboard')}
                </NavigationLink>
              </li>
              <LanguageModal />
            </ul>
          </nav>
        </div>
        <div className={styles['header-right']}>
          {isAuth ? <UserModal /> : <SignInModal />}
          <Burger />
        </div>
      </div>
    </header>
  )
}
