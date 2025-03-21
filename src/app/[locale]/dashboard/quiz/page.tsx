import List from '@/components/List/List'
import Loader from '@/components/Loader/Loader'
import QuizCard from '@/components/QuizCard/QuizCard'
import Container from '@/components/ui/Container/Container'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { H2, H3, H4, H6 } from '@/components/ui/Typography/Typography'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { getSession } from '@/lib/auth'
import { getAllGrammar } from '@/lib/grammar'
import { getYourLists } from '@/lib/lists'
import { DCEFRCollectionGroup, DCommonWords, DCategoriesWords } from '@/mock/DefaultCollectionGroups.mock'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './QuizPage.module.scss'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
// import { IList } from '@/interfaces/List.interface'
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

  if (type === 'vocabulary') {
    const session = await getSession()

    if (!session.isLoggedIn) {
      return (
        <>
          <div className={styles['no-list']}>
            <H2>{t('need_login')}</H2>
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
              <H2>{t('no_lists')}</H2>
            </div>
          )}
          {/* {data.length > 0 && (
            <div className="grid gap-4 grid-cols-auto-fill-140">
              {data.map((item: IList) => (
                <NavigationLink key={item._id} href={`/no-page`}>
                  <CustomList title={item.title} image={item.image} />
                </NavigationLink>
              ))}
            </div>
          )} */}

          <div className={styles['vocabulary-quiz']}>
            <div className={styles.top}>
              <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600 ">
                {t(DCEFRCollectionGroup.title)}
              </H6>
            </div>
            <div className={styles.items}>
              {DCEFRCollectionGroup.collections.map((collection) => (
                <div key={collection.id} className={styles.item}>
                  <List
                    title={collection.title}
                    image={collection.image}
                    href={`/dashboard/quiz/list/${collection.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="py-6">
            <div className="mb-6 flex justify-between">
              <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600 ">{t('categorized_wordlist')}</H6>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
              {DCategoriesWords.map((item) => (
                <CategoryItem key={item.title} title={t(item.title)} cssClass={item.class} href={item.href} />
              ))}
            </div>
          </div>
          <div className={styles['vocabulary-quiz']}>
            <div className={styles.top}>
              <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600 ">{t(DCommonWords.title)}</H6>
            </div>
            <div className={styles.items}>
              {DCommonWords.collections.map((collection) => (
                <div key={collection.id} className={styles.item}>
                  <List
                    title={collection.title}
                    image={collection.image}
                    href={`/dashboard/quiz/list/${collection.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
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
      <Container className={styles.container}>
        {!(type === 'grammar' || type === 'vocabulary') && (
          <div className={styles['no-page']}>
            <H3 className="text-2xl font-bold text-blue-200 mb-4">{t('no_page')}</H3>
            <NavigationLink href="/dashboard/quiz?type=grammar">{t('move_to_quizzes')}</NavigationLink>
          </div>
        )}

        {(type === 'grammar' || type === 'vocabulary') && (
          <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
            <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">{t('quiz_page')}</H2>
            <div className={styles.sections}>
              <div className={styles.top}>
                <H4 className="text-lg font-bold mb-0">{t('filter')}</H4>
                <div className={styles.tags}>
                  <NavigationLink href="/dashboard/quiz?type=grammar">
                    <span
                      className={twMerge(
                        styles.badge,
                        'dark:bg-[#1D2D4D] dark:border-[#1D2D4D]',
                        type === 'grammar' &&
                          `${styles.active} dark:border-purple-100 dark:bg-purple-100 dark:lg:hover:bg-purple-100 dark:lg:hover:border-purple-100`
                      )}
                    >
                      {t('grammar')}
                    </span>
                  </NavigationLink>
                  <NavigationLink href="/dashboard/quiz?type=vocabulary">
                    <span
                      className={twMerge(
                        styles.badge,
                        'dark:bg-[#1D2D4D] dark:border-[#1D2D4D]',
                        type === 'vocabulary' &&
                          `${styles.active} dark:border-purple-100 dark:bg-purple-100 dark:lg:hover:bg-purple-100 dark:lg:hover:border-purple-100`
                      )}
                    >
                      {t('vocabulary')}
                    </span>
                  </NavigationLink>
                </div>
              </div>
              <div className={styles.items}>
                <CategoryQuizPage type={type} locale={locale} />
              </div>
            </div>
          </Suspense>
        )}
      </Container>
    </>
  )
}
