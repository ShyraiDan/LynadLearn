import Achievements from '@/components/Achievements/Achievements'
import Loader from '@/components/Loader/Loader'
import ProfileEditModal from '@/components/ProfileEditModal/ProfileEditModal'
import { H3, P } from '@/components/ui/Typography/Typography'
import { getAllAchievements } from '@/lib/achievements'
import { getSession } from '@/lib/auth'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './ProfilePageRenamed.module.scss'
import Container from '@/components/ui/Container/Container'
import ScoredInfoModal from '@/components/ScoresInfoModal/ScoredInfoModal'

import { FaUser } from 'react-icons/fa'

// TODO output user point

interface IProfilePageProps {
  params: {
    locale: string
  }
}

interface IYourProfileProps {
  locale: string
}

async function YourProfile({ locale }: IYourProfileProps) {
  const session = await getSession()
  const achievements = await getAllAchievements()
  const t = await getTranslations('dashboard.profile')

  return (
    <>
      <div className={styles['user-info']}>
        <ProfileEditModal session={session} />
        <div className={twMerge(styles['user-photo'], 'dark:bg-[#1D2D4D]')}>
          {session.avatarUrl ? (
            <Image
              alt=""
              width={80}
              height={80}
              className="w-full h-full rounded-full"
              unoptimized
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/custom/${session.avatarUrl}`}
            />
          ) : (
            <FaUser className="dark:fill-grey-600" />
          )}
        </div>
        <div className={styles['user-details']}>
          <H3 className="font-bold text-lg mt-4 mb-2">{session.userName}</H3>
          <P>{session.location}</P>
          <div className="flex items-start gap-3">
            <ScoredInfoModal rating={session.rating as number} />
          </div>

          <P className="mt-2 dark:text-grey-600">{session.description}</P>
          <ul className={styles.achivements}>
            <li className="dark:text-grey-600">
              {session.successfulQuizzes &&
                session.totalQuizzes &&
                (Number(session.successfulQuizzes / session.totalQuizzes) * 100).toFixed(2)}{' '}
              % <P className="text-[12px]">{t('success_quiz')}</P>
            </li>
            <li className="dark:text-grey-600">
              {session.totalQuizzes} <P className="text-[12px]">{t('finished_quiz')}</P>
            </li>
            <li className="dark:text-grey-600">
              {session.wordLists} <P className="text-[12px]">{t('list_created')}</P>
            </li>
            <li className="dark:text-grey-600">
              {session.flashcardsLearned} <P className="text-[12px]">{t('words_learned')}</P>
            </li>
          </ul>
        </div>
      </div>
      <div className={twMerge(styles['achievements-section'], 'dark:text-grey-600')}>
        {t('achievements')}
        <div className={styles.achievements}>
          {achievements.map((item, i) => (
            <Achievements
              item={item}
              locale={locale}
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

export default function ProfilePage({ params }: IProfilePageProps) {
  return (
    <>
      <Container className={styles.container}>
        <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
          <YourProfile locale={params.locale} />
        </Suspense>
      </Container>
    </>
  )
}
