import styles from './Achievements.module.scss'

import { FaUser } from 'react-icons/fa'

export default function Achievements() {
  return (
    <div className={`${styles.achievement} ${styles.reached}`}>
      <div className={styles.icon}>
        <FaUser />
      </div>
      <h6>Achievement</h6>
      <div className={styles.progress}>
        <div style={{ width: '70%' }}></div>
      </div>
      <p>Learn 10 words</p>
    </div>
  )
}
