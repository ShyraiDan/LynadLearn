import { Category } from '@/components/Category/Category'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
import CustomCategory from '@/components/CustomCategory/CustomCategory'
import Loader from '@/components/Loader/Loader'
import { H6 } from '@/components/ui/Typography/Typography'
import { getYourLists } from '@/lib/lists'
import { DCEFRCollectionGroup, DCommonWords, DCategoriesWords } from '@/mock/DefaultCollectionGroups.mock'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import styles from './ListsPage.module.scss'
import Container from '@/components/ui/Container/Container'

async function YourCategories() {
  const yourCategory = await getYourLists()
  const t = await getTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.list}>
        <CustomCategory lists={yourCategory} />
      </div>

      <div className={styles.list}>
        <Category collection={DCEFRCollectionGroup} />
      </div>

      <div className={styles.category}>
        <div className={styles.top}>
          <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600 ">{t('categorized_wordlist')}</H6>
        </div>
        <div className={styles.categories}>
          {DCategoriesWords.map((item) => (
            <CategoryItem key={item.title} title={t(item.title)} cssClass={item.class} href={item.href} />
          ))}
        </div>
      </div>

      <div className={styles.list}>
        <Category collection={DCommonWords} />
      </div>
    </>
  )
}

export default function ListsPage() {
  return (
    <Container className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourCategories />
      </Suspense>
    </Container>
  )
}
