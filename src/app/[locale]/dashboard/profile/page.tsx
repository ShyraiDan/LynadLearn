import styles from './profilePage.module.scss'
import Achievements from '@/components/Achievements/Achievements'
import { useTranslations } from 'next-intl'

import { FaUser } from 'react-icons/fa'

export default function profilePage() {
  const t = useTranslations('dashboard.profile')

  return (
    <div className={styles.container}>
      <div className={styles['user-info']}>
        <div className={styles['user-photo']}>
          <FaUser />
        </div>
        <div className={styles['user-details']}>
          <h3>UserName</h3>
          <p>Address</p>
          <div className={styles.rate}>{t('rate')}: 1500</div>
          <p>Description</p>
          <ul className={styles.achivements}>
            <li>
              100% <p>{t('success_quiz')}</p>
            </li>
            <li>
              10 <p>{t('finished_quiz')}</p>
            </li>
            <li>
              10 <p>{t('list_created')}</p>
            </li>
            <li>
              100 <p>{t('words_learned')}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['achievements-section']}>
        {t('achievements')}
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
