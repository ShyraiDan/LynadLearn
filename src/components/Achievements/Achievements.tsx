import styles from './Achievements.module.scss'

import { FaUser } from 'react-icons/fa'

export default function Achievements() {
  return (
    <div className={styles.achievement}>
      <div className={styles.icon}>
        <FaUser />
      </div>
      <h6>Achievement</h6>
      <p>Learn 10 words</p>
    </div>
  )
}
