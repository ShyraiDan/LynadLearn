import styles from './QuizPage.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getYourLists } from '@/lib/lists'
import { getSession } from '@/lib/auth'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'
import CustomList from '@/components/CustomList/CustomList'
import { getAllGrammar } from '@/lib/grammar'

type TQuizPage = {
  searchParams: {
    type: string
  }
  params: {
    locale: string
  }
}

type TCategoryQuizPage = {
  type: string
  locale: string
}

async function CategoryQuizPage({ locale, type }: TCategoryQuizPage) {
  const t = await getTranslations('dashboard.quiz')

  if (type === 'grammar') {
    const grammarElementary = await getAllGrammar('A1-A2')

    return (
      <>
        <div className={styles.level}>
          <h2>A1-A2 grammar</h2>
          <div className={styles.topics}>
            {grammarElementary.map((item: any) => {
              return (
                <div key={item._id}>
                  <QuizCard topic={item} lang={locale} />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }

  if (type === 'vocabulary') {
    const session = await getSession()

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
}

export default function QuizPage({ searchParams, params }: TQuizPage) {
  const t = useTranslations('dashboard.quiz')
  const { type } = searchParams
  const { locale } = params

  return (
    <>
      <div className={styles.container}>
        {!(type === 'grammar' || type === 'vocabulary') && (
          <div className={styles['no-page']}>
            <h3>{t('no_page')}</h3>
            <NavigationLink href='/dashboard/quiz?type=grammar'>{t('move_to_quizzes')}</NavigationLink>
          </div>
        )}

        {(type === 'grammar' || type === 'vocabulary') && (
          <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
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
                <CategoryQuizPage type={type} locale={locale} />
              </div>
            </div>
          </Suspense>
        )}
      </div>
    </>
  )
}
