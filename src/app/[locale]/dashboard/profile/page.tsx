import styles from './profilePage.module.scss'
import Achievements from '@/components/Achievements/Achievements'
import { getTranslations } from 'next-intl/server'
import ProfileEditModal from '@/components/ProfileEditModal/ProfileEditModal'
import { getSession } from '@/lib/auth'

import { FaUser } from 'react-icons/fa'

export default async function ProfilePage() {
  const session = await getSession()
  const t = await getTranslations('dashboard.profile')

  return (
    <>
      <div className={styles.container}>
        <div className={styles['user-info']}>
          <ProfileEditModal session={session} />
          <div className={styles['user-photo']}>
            <FaUser />
          </div>
          <div className={styles['user-details']}>
            <h3>{session.userName}</h3>
            <p>Address: {session.location}</p>
            <div className={styles.rate}>
              {t('rate')}: {session.rating}
            </div>
            <p>Description: {session.description}</p>
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
    </>
  )
}
