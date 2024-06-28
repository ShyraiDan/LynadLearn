'use client'

import styles from './UserModal.module.scss'
import { useState } from 'react'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { logout } from '@/lib/auth'

import { MdEdit } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

export function UserModal() {
  const [isUserModal, setUserModal] = useState(false)

  return (
    <>
      <div onClick={() => setUserModal((state) => !state)} className={styles.user}>
        <div className={styles['user-avatar']}>
          <FaUser className={styles.icon} />
        </div>
      </div>
      {isUserModal && (
        <div className={styles.modal}>
          <ul>
            <li>
              <NavigationLink href={'/dashboard/profile'}>
                <FaUser className={styles.icon} />
                Profile
              </NavigationLink>
            </li>
            <li>
              <MdEdit className={styles.icon} /> Edit Profile
            </li>
            <li onClick={() => logout()}>
              <MdLogout className={styles.icon} /> Logout
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
