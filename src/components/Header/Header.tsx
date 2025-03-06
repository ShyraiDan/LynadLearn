import styles from './Header.module.scss'
import LanguageModal from '@/components/LanguageModal/LanguageModal'
import { AuthModalButton } from '@/components/AuthModalButton/AuthModalButton'
import Burger from '@/components/Burger/Burger'
import { UserModal } from '@/components/UserModal/UserModal'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getSession } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'
import { Themes } from '@/components/Themes/Themes'
import { twMerge } from 'tailwind-merge'

import { FaUser } from 'react-icons/fa'

export async function Header() {
  const { isLoggedIn, avatarUrl } = await getSession()
  const t = await getTranslations('Header')
  const tForms = await getTranslations('Forms')

  return (
    <header className={twMerge(styles.header, 'dark:bg-blue-600 dark:border-[#1D2D4D]')}>
      <div className={`${styles['header-container']} ${styles.dashboard} dark:border-none`}>
        <div className={styles['header-left']}>
          <NavigationLink href="/">
            Lynad<span>Learn</span>
          </NavigationLink>
          <nav>
            <ul className={styles['nav-list']}>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/about-us">
                  {t('about_us')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/pricing">
                  {t('pricing')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/contact-us">
                  {t('contact_us')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/mobile-app">
                  {t('mobile_app')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/dashboard/lists">
                  {t('dashboard')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/dictionary">
                  {t('dictionary')}
                </NavigationLink>
              </li>
              <li className={styles['nav-item']}>
                <NavigationLink className={styles.link} hover isHeader href="/translator">
                  {t('translator')}
                </NavigationLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles['header-right']}>
          <div className="hidden lg:block">
            <Themes />
          </div>
          <div className="ml-2">
            <LanguageModal />
          </div>
          {isLoggedIn ? (
            <UserModal avatarUrl={avatarUrl} />
          ) : (
            <AuthModalButton className="flex items-center justify-center w-full bg-blue-200" containerStyles="ml-2">
              <div className="hidden md:block md:mr-2">
                <FaUser />
              </div>
              {tForms('sign_in')}
            </AuthModalButton>
          )}
          <Burger isAuth={isLoggedIn} />
        </div>
      </div>
    </header>
  )
}
