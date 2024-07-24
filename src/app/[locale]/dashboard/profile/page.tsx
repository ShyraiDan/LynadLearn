import styles from './ProfilePage.module.scss'
import Achievements from '@/components/Achievements/Achievements'
import { getTranslations } from 'next-intl/server'
import ProfileEditModal from '@/components/ProfileEditModal/ProfileEditModal'
import { getSession, ISession } from '@/lib/auth'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { DAchievement } from '@/mock/Achievments.mock'

import { FaUser } from 'react-icons/fa'

// TODO: user gets 1 rate point for each correct answer in quiz and 5 points for completing quiz
// TODO: user gets 1 rate point for each correct answer in flashcard

function calculateRate(session: ISession) {
  let score = 0

  console.log('func', session)

  DAchievement.forEach((item) => {
    let amount: number | undefined = 0
    switch (item.type) {
      case 'flashcards':
        amount = session.flashcardsLearned
        break
      case 'quiz':
        amount = session.successfulQuizzes
        break
      case 'lists':
        amount = session.wordLists
        break
      default:
        amount = session.words
        break
    }

    if (amount && amount >= item.target) {
      score += 25
    }
  })

  return score
}

async function YourProfile() {
  let session = await getSession()
  const t = await getTranslations('dashboard.profile')

  return (
    <>
      <div className={styles['user-info']}>
        <ProfileEditModal session={session} />
        <div className={styles['user-photo']}>
          <FaUser />
        </div>
        <div className={styles['user-details']}>
          <h3>{session.userName}</h3>
          <p>{session.location}</p>
          <div className={styles.rate}>
            {t('rate')}: {(session.rating as number) + calculateRate(session)}
          </div>
          <p>{session.description}</p>
          <ul className={styles.achivements}>
            <li>
              {session.successfulQuizzes && session.totalQuizzes && session.successfulQuizzes / session.totalQuizzes} %{' '}
              <p>{t('success_quiz')}</p>
            </li>
            <li>
              {session.totalQuizzes} <p>{t('finished_quiz')}</p>
            </li>
            <li>
              {session.wordLists} <p>{t('list_created')}</p>
            </li>
            <li>
              {session.flashcardsLearned} <p>{t('words_learned')}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['achievements-section']}>
        {t('achievements')}
        <div className={styles.achievements}>
          {DAchievement.map((item, i) => (
            <Achievements
              item={item}
              key={i}
              percent={
                ((item.type === 'flashcards'
                  ? session.flashcardsLearned
                  : item.type === 'quiz'
                  ? session.successfulQuizzes
                  : item.type === 'lists'
                  ? session.wordLists
                  : session.words) as number) / item.target
              }
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default function ProfilePage() {
  return (
    <>
      <div className={styles.container}>
        <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
          <YourProfile />
        </Suspense>
      </div>
    </>
  )
}
