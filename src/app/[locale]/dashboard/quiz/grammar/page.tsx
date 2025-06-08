'use client'

import Loader from '@/components/Loader/Loader'
import QuizCard from '@/components/QuizCard/QuizCard'
import Container from '@/components/ui/Container/Container'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { H2, H4 } from '@/components/ui/Typography/Typography'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './QuizPage.module.scss'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { getSession, ISession } from '@/lib/auth'
import SnackBar from '@/components/ui/SnackBar/SnackBar'

type TGrammarQuizPage = {
  params: {
    locale: string
  }
}

export default function GrammarQuizPage({ params }: TGrammarQuizPage) {
  const t = useTranslations('dashboard.quiz')
  const [session, setSession] = useState<ISession>()
  const { locale } = params

  const {
    data: grammarElementary,
    isLoading,
    error
  } = useSWR<IGrammarTopic[]>('/api/grammar?activityType=quiz', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })
  }, [])

  return (
    <>
      <Container className={twMerge(styles.container, 'p-0')}>
        {isLoading && <Loader dimensionClass={styles.loader} />}

        {grammarElementary && (
          <>
            <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">{t('quiz_page')}</H2>
            <div className={styles.sections}>
              <div className={twMerge(styles.top, 'px-4')}>
                <H4 className="text-lg font-bold mb-0">{t('filter')}</H4>
                <div className={styles.tags}>
                  <NavigationLink href="/dashboard/quiz/grammar">
                    <span
                      className={twMerge(
                        styles.badge,
                        'dark:bg-[#1D2D4D] dark:border-[#1D2D4D]',
                        `${styles.active} dark:border-purple-100 dark:bg-purple-100 dark:lg:hover:bg-purple-100 dark:lg:hover:border-purple-100`
                      )}
                    >
                      {t('grammar')}
                    </span>
                  </NavigationLink>
                  <NavigationLink href="/dashboard/quiz/vocabulary">
                    <span className={twMerge(styles.badge, 'dark:bg-[#1D2D4D] dark:border-[#1D2D4D]')}>
                      {t('vocabulary')}
                    </span>
                  </NavigationLink>
                </div>
              </div>
              <div className={styles.items}>
                <div className={twMerge(styles.level, 'px-4 pb-4')}>
                  <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">A1-A2 grammar</H2>
                  <div className={styles.topics}>
                    {grammarElementary?.map((item: IGrammarTopic) => {
                      return (
                        <div key={item._id.toString()}>
                          <QuizCard topic={item} lang={locale} session={session} type="quiz" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>

      <SnackBar />
    </>
  )
}
