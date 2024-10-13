'use client'

import styles from './UserModal.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { logout } from '@/lib/auth'
import { useTranslations } from 'next-intl'

import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

export function UserModal() {
  const t = useTranslations('dashboard.profile')
  return (
    <>
      <div className={styles.user}>
        <div className={styles['user-avatar']}>
          <FaUser className={styles.icon} />
        </div>
        <div className={styles.modal}>
          <ul>
            <li>
              <NavigationLink hover={false} href={'/dashboard/profile'}>
                <FaUser className={styles.icon} />
                {t('profile')}
              </NavigationLink>
            </li>
            <li onClick={() => logout()}>
              <MdLogout className={styles.icon} /> {t('logout')}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
