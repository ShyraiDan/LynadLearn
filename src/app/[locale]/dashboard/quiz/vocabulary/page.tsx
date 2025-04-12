import List from '@/components/List/List'
import Loader from '@/components/Loader/Loader'
import Container from '@/components/ui/Container/Container'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { H2, H3, H4, P } from '@/components/ui/Typography/Typography'
// import { getSession } from '@/lib/auth'
// import { getYourLists } from '@/lib/lists'
import { DCEFRCollectionGroup, DCommonWords, DCategoriesWords } from '@/mock/DefaultCollectionGroups.mock'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './QuizPage.module.scss'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
// import CustomList from '@/components/CustomList/CustomList'

async function CategoryQuizPage() {
  const t = await getTranslations('dashboard.quiz')

  //  TODO: User vocabulary quiz
  // const userLists = await getYourLists()

  return (
    <>
      <div className={styles.level}>
        {/* TODO: User vocabulary quiz */}
        {/* 
          {!userLists.length && (
              <div className={styles['no-list']}>
                <H2>{t('no_lists')}</H2>
              </div>
          )}
          
          {userLists && (
            <div className="py-6 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4">
              <div className={styles.top}>
                <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600">{t('choose_word_list')}</H6>
              </div>
              <div>
                <div className="flex gap-3 overflow-x-auto sm:bg-[#deede671] sm:px-4 sm:my-6 sm:pt-10 sm:pb-5 sm:rounded-2xl sm:shadow-sm sm:shadow-[#00000013] md:rounded-l-none md:basis-7/12 md:max-w-[calc(100%-300px)] lg:max-w-[calc(100vw-292px)] lg:rounded-2xl">
                  {userLists.map((item) => (
                    <div key={item._id} className={styles.item}>
                      <NavigationLink href={`/dashboard/quiz/${item._id}`}>
                        <CustomList title={item.title} image={item.image} />
                      </NavigationLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )} */}

        <div className="mx-4 py-6 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 sm:mx-0 dark:bg-none dark:bg-blue-600">
          <div>
            <div className="mb-4 md:hidden">
              <H3 className="font-bold text-[16px] text-blue-150 md:mb-0">{t(DCEFRCollectionGroup.title)}</H3>
            </div>
            <div className="flex w-full h-full rounded-2xl px-4 pt-4 pb-2 dark:!bg-[#18223D]">
              <div className="hidden md:block mt-2 max-w-[350px] pr-4 md:pr-8">
                <H3 className="text-blue-150 text-2xl font-bold sm:mb-3 md:text-3xl">
                  {t(DCEFRCollectionGroup.title)}
                </H3>
                <P className="py-2 text-blue-350 font-medium">{t(DCEFRCollectionGroup.description)}</P>
              </div>
              <div className="flex flex-nowrap overflow-x-auto gap-4">
                {DCEFRCollectionGroup.collections.map((item) => (
                  <List key={item.id} title={item.title} image={item.image} href={`/dashboard/quiz/list/${item.id}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 px-4 flex flex-col gap-4 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 sm:mx-0 dark:bg-none dark:bg-blue-600">
          <div className={styles.top}>
            <H3 className="font-bold text-blue-150 mb-0 text-[16px] md:text-[30px] dark:!text-grey-600">
              {t('categorized_wordlist')}
            </H3>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {DCategoriesWords.map((item) => (
              <CategoryItem
                key={item.title}
                title={t(item.title)}
                cssClass={item.class}
                href={`/dashboard/quiz/collections/${item.title}`}
              />
            ))}
          </div>
        </div>

        <div className="mx-4 py-6 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 sm:mx-0 dark:bg-none dark:bg-blue-600">
          <div>
            <div className="mb-4 md:hidden">
              <H3 className="font-bold text-[16px] text-blue-150 md:mb-0">{t(DCommonWords.title)}</H3>
            </div>
            <div className="flex w-full h-full rounded-2xl px-4 pt-4 pb-2 dark:!bg-[#18223D]">
              <div className="hidden md:block mt-2 max-w-[350px] pr-4 md:pr-8">
                <H3 className="text-blue-150 text-2xl font-bold sm:mb-3 md:text-3xl">{t(DCommonWords.title)}</H3>
                <P className="py-2 text-blue-350 font-medium">{t(DCommonWords.description)}</P>
              </div>
              <div className="flex flex-nowrap overflow-x-auto gap-4">
                {DCommonWords.collections.map((item) => (
                  <List key={item.id} title={item.title} image={item.image} href={`/dashboard/quiz/list/${item.id}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function VocabularyQuizPage() {
  const t = useTranslations('dashboard.quiz')

  return (
    <Container className={twMerge(styles.container, 'p-0')}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">{t('quiz_page')}</H2>
        <div className={styles.sections}>
          <div className={twMerge(styles.top, 'px-4')}>
            <H4 className="text-lg font-bold mb-0">{t('filter')}</H4>
            <div className={styles.tags}>
              <NavigationLink href="/dashboard/quiz/grammar">
                <span className={twMerge(styles.badge, 'dark:bg-[#1D2D4D] dark:border-[#1D2D4D]')}>{t('grammar')}</span>
              </NavigationLink>
              <NavigationLink href="/dashboard/quiz/vocabulary">
                <span
                  className={twMerge(
                    styles.badge,
                    'dark:bg-[#1D2D4D] dark:border-[#1D2D4D]',
                    `${styles.active} dark:border-purple-100 dark:bg-purple-100 dark:lg:hover:bg-purple-100 dark:lg:hover:border-purple-100`
                  )}
                >
                  {t('vocabulary')}
                </span>
              </NavigationLink>
            </div>
          </div>
          <div className={styles.items}>
            <CategoryQuizPage />
          </div>
        </div>
      </Suspense>
    </Container>
  )
}
