import styles from './Flashcard.module.scss'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import CustomList from '@/components/CustomList/CustomList'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { DCEFRCollectionGroup } from '@/mock/DefaultCollectionGroups.mock'
import { getTranslations } from 'next-intl/server'
import List from '@/components/List/List'
import { H2, H3, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'
import { DCategoriesWords, DCommonWords } from '@/mock/DefaultCollectionGroups.mock'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
import { twMerge } from 'tailwind-merge'
import { IList } from '@/interfaces/List.interface'
import CategoryDescription from '@/components/Category/components/CategoryDescription/CategoryDescription'

async function YourLists() {
  const lists = await getYourLists()
  const t = await getTranslations()
  return (
    <>
      <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">
        {t('dashboard.flashcard.flashcard_page')}
      </H2>
      <div className={styles.sections}>
        <div className="py-6 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 dark:bg-none dark:bg-blue-600">
          <div className="mx-4 sm:mx-0 md:flex">
            <CategoryDescription title={t('your_lists')} />
            <div className="flex gap-3 overflow-x-auto rounded-2xl px-4 pt-4 pb-2 sm:bg-[#deede671] sm:px-4 sm:my-6 sm:pt-10 sm:pb-5 sm:shadow-sm sm:shadow-[#00000013] sm:gap-6 md:rounded-l-none md:w-full md:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-292px)] lg:rounded-2xl lg:rounded-l-none dark:!bg-[#18223D]">
              {lists.map((item: IList) => (
                <NavigationLink key={item._id} href={`/dashboard/flashcard/${item._id}`}>
                  <CustomList title={item.title} image={item.image} />
                </NavigationLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-4 py-6 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 sm:mx-0 dark:bg-none dark:bg-blue-600">
          <div>
            <div className="mb-4 md:hidden">
              <H3 className="font-bold text-[16px] text-blue-150 md:mb-0">
                {t(`dashboard.flashcard.${DCEFRCollectionGroup.title}`)}
              </H3>
            </div>
            <div className="flex w-full h-full rounded-2xl px-4 pt-4 pb-2 dark:!bg-[#18223D]">
              <div className="hidden md:block mt-2 max-w-[350px] pr-4 md:pr-8">
                <H3 className="text-blue-150 text-2xl font-bold sm:mb-3 md:text-3xl">
                  {t(`dashboard.flashcard.${DCEFRCollectionGroup.title}`)}
                </H3>
                <P className="py-2 text-blue-350 font-medium">
                  {t(`dashboard.flashcard.${DCEFRCollectionGroup.description}`)}
                </P>
              </div>
              <div className="flex flex-nowrap overflow-x-auto gap-4">
                {DCEFRCollectionGroup.collections.map((item) => (
                  <List
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    href={`/dashboard/flashcard/list/${item.id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 px-4 flex flex-col gap-4 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 sm:mx-0 dark:bg-none dark:bg-blue-600">
          <div className={styles.top}>
            <H3 className="font-bold text-blue-150 mb-0 text-[16px] md:text-[30px] dark:!text-grey-600">
              {t('dashboard.flashcard.categorized_wordlist')}
            </H3>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {DCategoriesWords.map((item) => (
              <CategoryItem
                key={item.title}
                title={t(item.title)}
                cssClass={item.class}
                href={`/dashboard/flashcard/collections/${item.title}`}
              />
            ))}
          </div>
        </div>

        <div className="mx-4 py-6 bg-gradient-to-b from-white-100 to-[#f4f6f8] sm:px-4 sm:mx-0 dark:bg-none dark:bg-blue-600">
          <div>
            <div className="mb-4 md:hidden">
              <H3 className="font-bold text-[16px] text-blue-150 md:mb-0">
                {t(`dashboard.flashcard.${DCommonWords.title}`)}
              </H3>
            </div>
            <div className="flex w-full h-full rounded-2xl px-4 pt-4 pb-2 dark:!bg-[#18223D]">
              <div className="hidden md:block mt-2 max-w-[350px] pr-4 md:pr-8">
                <H3 className="text-blue-150 text-2xl font-bold sm:mb-3 md:text-3xl">
                  {t(`dashboard.flashcard.${DCommonWords.title}`)}
                </H3>
                <P className="py-2 text-blue-350 font-medium">{t(`dashboard.flashcard.${DCommonWords.description}`)}</P>
              </div>
              <div className="flex flex-nowrap overflow-x-auto gap-4">
                {DCommonWords.collections.map((item) => (
                  <List
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    href={`/dashboard/flashcard/list/${item.id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function FlashcardPage() {
  return (
    <Container className={twMerge(styles.container, 'p-0')}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourLists />
      </Suspense>
    </Container>
  )
}
