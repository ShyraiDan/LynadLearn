import styles from './UserModal.module.scss'

import { MdEdit } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

export default function UserModal() {
  return (
    <div className={styles.modal}>
      <ul>
        <li>
          {' '}
          <FaUser className={styles.icon} />
          Profile
        </li>
        <li>
          {' '}
          <MdEdit className={styles.icon} /> Edit Profile
        </li>
        <li>
          <MdLogout className={styles.icon} /> Logout
        </li>
      </ul>
    </div>
  )
}
