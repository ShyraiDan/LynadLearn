'use client'

import styles from './UserModal.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { logout } from '@/lib/auth'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

interface IUserModalProps {
  avatarUrl?: string
}

export function UserModal({ avatarUrl }: IUserModalProps) {
  const t = useTranslations('dashboard.profile')
  const pathname = usePathname()

  return (
    <>
      <div className={styles.user}>
        <div className={twMerge(styles['user-avatar'], 'dark:bg-[#1D2D4D]')}>
          {avatarUrl ? (
            <Image
              alt=""
              width={80}
              height={80}
              className="w-full h-full rounded-full"
              unoptimized
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/custom/${avatarUrl}`}
            />
          ) : (
            <FaUser className={styles.icon} />
          )}
        </div>
        <div className={styles.modal}>
          <ul className="dark:bg-[#1D2D4D]">
            <li
              className={twMerge(
                '[&_svg]:dark:!fill-grey-600 dark:lg:hover:!text-purple-100',
                pathname?.includes('/dashboard/profile') && styles.selected
              )}
            >
              <NavigationLink
                hover={false}
                href="/dashboard/profile"
                className="dark:lg:hover:!text-purple-100 [&_svg]:dark:lg:hover:!fill-purple-100"
              >
                <FaUser className={twMerge(styles['link-icon'], 'mr-1')} />
                {t('profile')}
              </NavigationLink>
            </li>
            <li onClick={() => logout()}>
              <span className="flex flex-row items-center cursor-pointer [&_svg]:dark:!fill-grey-600 dark:text-grey-600 dark:lg:hover:!text-purple-100 [&_svg]:dark:lg:hover:!fill-purple-100">
                <MdLogout className={twMerge(styles['link-icon'], 'mr-1')} /> {t('logout')}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
