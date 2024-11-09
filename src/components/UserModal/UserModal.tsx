'use client'

import styles from './UserModal.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { logout } from '@/lib/auth'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { useRouter, usePathname } from 'next/navigation'

import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

export function UserModal() {
  const t = useTranslations('dashboard.profile')
  const pathname = usePathname()

  return (
    <>
      <div className={styles.user}>
        <div className={twMerge(styles['user-avatar'], 'dark:bg-[#1D2D4D]')}>
          <FaUser className={styles.icon} />
        </div>
        <div className={styles.modal}>
          <ul className='dark:bg-[#1D2D4D]'>
            <li
              className={twMerge(
                '[&_svg]:dark:!fill-grey-600 dark:hover:!text-purple-100',
                pathname.includes('/dashboard/profile') && styles.selected
              )}>
              <NavigationLink
                hover={false}
                href={'/dashboard/profile'}
                className='dark:hover:!text-purple-100 [&_svg]:dark:hover:!fill-purple-100'>
                <FaUser className={twMerge(styles['link-icon'], 'mr-1')} />
                {t('profile')}
              </NavigationLink>
            </li>
            <li onClick={() => logout()}>
              <span className='flex flex-row items-center cursor-pointer [&_svg]:dark:!fill-grey-600 dark:text-grey-600 dark:hover:!text-purple-100 [&_svg]:dark:hover:!fill-purple-100'>
                <MdLogout className={twMerge(styles['link-icon'], 'mr-1')} /> {t('logout')}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
