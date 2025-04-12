import Loader from '@/components/Loader/Loader'
import QuizCard from '@/components/QuizCard/QuizCard'
import Container from '@/components/ui/Container/Container'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { H2, H4 } from '@/components/ui/Typography/Typography'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { getAllGrammar } from '@/lib/grammar'
// import { getYourLists } from '@/lib/lists'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './QuizPage.module.scss'
// import CustomList from '@/components/CustomList/CustomList'

type TQuizPage = {
  searchParams: {
    type: string
  }
  params: {
    locale: string
  }
}

type TCategoryQuizPage = {
  locale: string
}

async function CategoryQuizPage({ locale }: TCategoryQuizPage) {
  const t = await getTranslations('dashboard.quiz')

  const grammarElementary = await getAllGrammar('A1-A2')

  return (
    <>
      <div className={twMerge(styles.level, 'px-4 pb-4')}>
        <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">A1-A2 grammar</H2>
        <div className={styles.topics}>
          {grammarElementary.map((item: IGrammarTopic) => {
            return (
              <div key={item._id.toString()}>
                <QuizCard topic={item} lang={locale} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function GrammarQuizPage({ params }: TQuizPage) {
  const t = useTranslations('dashboard.quiz')
  const { locale } = params

  return (
    <Container className={twMerge(styles.container, 'p-0')}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
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
            <CategoryQuizPage locale={locale} />
          </div>
        </div>
      </Suspense>
    </Container>
  )
}
