import styles from './Flashcard.module.scss'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import CustomList from '@/components/CustomList/CustomList'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { DCEFRCollectionGroup } from '@/mock/DefaultCollectionGroups.mock'
import { getTranslations } from 'next-intl/server'
import List from '@/components/List/List'
import { H2, H6 } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'
import { DCategoriesWords, DCommonWords } from '@/mock/DefaultCollectionGroups.mock'
import CategoryItem from '@/components/CategoryItem/CategoryItem'

async function YourLists() {
  const lists = await getYourLists()
  const t = await getTranslations()
  return (
    <>
      <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">
        {t('dashboard.flashcard.flashcard_page')}
      </H2>
      <div className={styles.sections}>
        <div className="py-6 flex flex-col gap-4">
          <div className={styles.top}>
            <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600">
              {t('dashboard.flashcard.choose_word_list')}
            </H6>
          </div>
          <div className={styles.items}>
            {lists.map((item) => (
              <div key={item._id} className={styles.item}>
                <NavigationLink href={`/dashboard/flashcard/${item._id}`}>
                  <CustomList title={item.title} image={item.image} />
                </NavigationLink>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6 flex flex-col gap-4">
          <div className={styles.top}>
            <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600">
              {t(`dashboard.flashcard.${DCEFRCollectionGroup.title}`)}
            </H6>
          </div>
          <div className={styles.items}>
            {DCEFRCollectionGroup.collections.map((collection) => (
              <div key={collection.id} className={styles.item}>
                <List
                  title={collection.title}
                  image={collection.image}
                  href={`/dashboard/flashcard/list/${collection.id}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="py-6 flex flex-col gap-4">
          <div className={styles.top}>
            <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600">
              {t('dashboard.flashcard.categorized_wordlist')}
            </H6>
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
        <div className="py-6 flex flex-col gap-4">
          <div className={styles.top}>
            <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600">
              {t(`dashboard.flashcard.${DCommonWords.title}`)}
            </H6>
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

export default function FlashcardPage() {
  return (
    <Container className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourLists />
      </Suspense>
    </Container>
  )
}
