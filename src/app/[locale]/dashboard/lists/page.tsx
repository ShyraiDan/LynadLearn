import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import CustomCategory from '@/components/CustomCategory/CustomCategory'
import Loader from '@/components/Loader/Loader'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
import { getTranslations } from 'next-intl/server'
import { H6 } from '@/components/ui/Typography/Typography'

const categories = [
  {
    title: 'adverbs',
    class: 'adverbs',
    href: '/dashboard/collections/adverbs'
  },
  {
    title: 'verbs',
    class: 'verbs',
    href: '/dashboard/collections/verbs'
  },
  {
    title: 'adjectives',
    class: 'adjectives',
    href: '/dashboard/collections/adjectives'
  },
  {
    title: 'other',
    class: 'other',
    href: '/dashboard/collections/other'
  }
]

async function YourCategories() {
  const yourCategory = await getYourLists()
  const t = await getTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.list}>
        <CustomCategory lists={yourCategory} />
      </div>

      {DCategories.map((item) => (
        <div key={item._id} className={styles.list}>
          <Category title={item.title} lists={item.lists} description={item.description} />
        </div>
      ))}
      <div className={styles.category}>
        <div className={styles.top}>
          <H6 className="font-bold mb-2 text-blue-150 md:mb-0 dark:!text-grey-600 ">{t('categorized_wordlist')}</H6>
        </div>
        <div className={styles.categories}>
          {categories.map((item) => (
            <CategoryItem key={item.title} title={t(item.title)} cssClass={item.class} href={item.href} />
          ))}
        </div>
      </div>
    </>
  )
}

export default function ListsPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourCategories />
      </Suspense>
    </div>
  )
}
