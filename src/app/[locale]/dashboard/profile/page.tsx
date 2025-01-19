import styles from './ProfilePageRenamed.module.scss'
import Achievements from '@/components/Achievements/Achievements'
import { getTranslations } from 'next-intl/server'
import ProfileEditModal from '@/components/ProfileEditModal/ProfileEditModal'
import { getSession, ISession } from '@/lib/auth'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { DAchievement } from '@/mock/Achievments.mock'
import { twMerge } from 'tailwind-merge'

import { FaUser } from 'react-icons/fa'

// TODO output user point

function calculateRate(session: ISession) {
  let score = 0

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
        <div className={twMerge(styles['user-photo'], 'dark:bg-[#1D2D4D]')}>
          <FaUser className='dark:fill-grey-600' />
        </div>
        <div className={styles['user-details']}>
          <h3 className='dark:text-grey-600'>{session.userName}</h3>
          <p className='dark:text-grey-600'>{session.location}</p>
          <div className={twMerge(styles.rate, 'dark:text-grey-600 dark:bg-[#1D2D4D]')}>
            {t('rate')}: {(session.rating as number) + calculateRate(session)}
          </div>
          <p className='dark:text-grey-600'>{session.description}</p>
          <ul className={styles.achivements}>
            <li className='dark:text-grey-600'>
              {session.successfulQuizzes && session.totalQuizzes && session.successfulQuizzes / session.totalQuizzes} %{' '}
              <p>{t('success_quiz')}</p>
            </li>
            <li className='dark:text-grey-600'>
              {session.totalQuizzes} <p>{t('finished_quiz')}</p>
            </li>
            <li className='dark:text-grey-600'>
              {session.wordLists} <p>{t('list_created')}</p>
            </li>
            <li className='dark:text-grey-600'>
              {session.flashcardsLearned} <p>{t('words_learned')}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={twMerge(styles['achievements-section'], 'dark:text-grey-600')}>
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
