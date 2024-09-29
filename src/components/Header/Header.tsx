import styles from './Header.module.scss'
import LanguageModal from '../LanguageModal/LanguageModal'
import { AuthModal } from '../AuthModal/AuthModal'
import Burger from '../Burger/Burger'
import { UserModal } from '../UserModal/UserModal'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { getSession } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'

export async function Header() {
  const { isLoggedIn } = await getSession()
  const t = await getTranslations('Header')

  return (
    <header className={styles.header}>
      <div className={`${styles['header-container']} ${styles.dashboard}`}>
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
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href='/dictionary'>
                  {t('dictionary')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink hover isHeader href='/translator'>
                  {t('translator')}
                </NavigationLink>
              </li>
              <LanguageModal />
            </ul>
          </nav>
        </div>
        <div className={styles['header-right']}>
          {isLoggedIn ? <UserModal /> : <AuthModal />}
          <Burger isAuth={isLoggedIn} />
        </div>
      </div>
    </header>
  )
}
