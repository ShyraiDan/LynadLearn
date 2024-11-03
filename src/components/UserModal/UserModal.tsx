'use client'

import styles from './UserModal.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { logout } from '@/lib/auth'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

//TODO fix hovering: move to profile page and check profile page link, while you are hovering user icon is still hovers
//TODO while hovering the text make hovering together with text (for now we have small delay icon and text inside modal)

export function UserModal() {
  const t = useTranslations('dashboard.profile')
  return (
    <>
      <div className={styles.user}>
        <div className={twMerge(styles['user-avatar'], 'dark:bg-[#1D2D4D]')}>
          <FaUser className={styles.icon} />
        </div>
        <div className={styles.modal}>
          <ul className='dark:bg-[#1D2D4D]'>
            <li>
              <NavigationLink hover={false} href={'/dashboard/profile'}>
                <FaUser className={twMerge(styles.icon, 'dark:fill-grey-600 mr-1')} />
                {t('profile')}
              </NavigationLink>
            </li>
            <li onClick={() => logout()} className='dark:text-grey-600'>
              <MdLogout className={twMerge(styles.icon, 'mr-1')} /> {t('logout')}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
