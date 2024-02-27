'use client'

import styles from './UserModal.module.scss'
import { useState } from 'react'

import { MdEdit } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'

export function UserModal() {
  const [isUserModal, setUserModal] = useState(false)

  return (
    <>
      <div onClick={() => setUserModal((state) => !state)} className={styles.user}>
        <div className={styles['user-avatar']}>
          <FaUser className={styles.icon} />
        </div>
        <IoIosArrowDown className={`${styles.arrow} ${isUserModal && styles.active}`} />
      </div>
      {isUserModal && (
        <div className={styles.modal}>
          <ul>
            <li>
              <FaUser className={styles.icon} />
              Profile
            </li>
            <li>
              <MdEdit className={styles.icon} /> Edit Profile
            </li>
            <li>
              <MdLogout className={styles.icon} /> Logout
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
