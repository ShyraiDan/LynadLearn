import styles from './QuizPage.module.scss'
import { DGrammar } from '@/mock/Grammar.mock'
import QuizCard from '@/components/QuizCard/QuizCard'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getYourLists } from '@/lib/lists'
import { getSession } from '@/lib/auth'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'
import CustomList from '@/components/CustomList/CustomList'

async function VocabularyQuizPage() {
  const session = await getSession()
  const t = await getTranslations('dashboard.quiz')

  if (!session.isLoggedIn) {
    return (
      <>
        <div className={styles['no-list']}>
          <h2>{t('need_login')}</h2>
        </div>
      </>
    )
  }

  const data = await getYourLists()

  return (
    <>
      <div className={styles.level}>
        {!data.length && (
          <div className={styles['no-list']}>
            <h2>{t('no_lists')}</h2>
          </div>
        )}
        {data.length > 0 && (
          <>
            <h2>{t('select_your_list')}</h2>
            <div className={styles.lists}>
              {data.map((item) => (
                <NavigationLink key={item._id} href={`/dashboard/quiz/${item._id}`}>
                  <CustomList title={item.title} image={item.image} />
                </NavigationLink>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default function QuizPage({ searchParams }: any) {
  const { type } = searchParams

  const t = useTranslations('dashboard.quiz')
  return (
    <>
      <div className={styles.container}>
        <h2>{t('quiz_page')}</h2>
        <div className={styles.sections}>
          <div className={styles.top}>
            <h4>{t('filter')}</h4>
            <div className={styles.tags}>
              <span className={`${type === 'grammar' && styles.active}`}>
                <NavigationLink href='/dashboard/quiz?type=grammar'>{t('grammar')}</NavigationLink>
              </span>
              <span className={`${type === 'vocabulary' && styles.active}`}>
                <NavigationLink href='/dashboard/quiz?type=vocabulary'>{t('vocabulary')}</NavigationLink>
              </span>
            </div>
          </div>
          <div className={styles.items}>
            {type === 'grammar' ? (
              DGrammar.map((item) => (
                <div key={item.level} className={styles.level}>
                  <h2>{item.level}</h2>
                  <div className={styles.topics}>
                    {item.topics.map((topic) => (
                      <QuizCard key={topic.title} topic={topic} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Suspense fallback={<Loader />}>
                <VocabularyQuizPage />
              </Suspense>
            )}
          </div>
        </div>
        <div className={styles.sections}></div>
      </div>
    </>
  )
}
