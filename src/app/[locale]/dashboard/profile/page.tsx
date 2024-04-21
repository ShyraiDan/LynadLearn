import styles from './profilePage.module.scss'
import Achievements from '@/components/Achievements/Achievements'

import { FaUser } from 'react-icons/fa'

export default function profilePage() {
  return (
    <div className={styles.container}>
      <div className={styles['user-info']}>
        <div className={styles['user-photo']}>
          <FaUser />
        </div>
        <div className={styles['user-details']}>
          <h3>UserName</h3>
          <p>Address</p>
          <div className={styles.rate}>Rate: 1500</div>
          <p>Description</p>
          <ul className={styles.achivements}>
            <li>
              100% <p>Success quiz</p>
            </li>
            <li>
              10 <p>Finished quiz(es)</p>
            </li>
            <li>
              10 <p>List(s) created</p>
            </li>
            <li>
              100 <p>Word(s) learned</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['achievements-section']}>
        Achievements
        <div className={styles.achievements}>
          <Achievements />
          <Achievements />
          <Achievements />
          <Achievements />
          <Achievements />
          <Achievements />
          <Achievements />
        </div>
      </div>
    </div>
  )
}
