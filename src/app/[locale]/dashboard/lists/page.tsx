import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import CustomCategory from '@/components/CustomCategory/CustomCategory'
import Loader from '@/components/Loader/Loader'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
import { getTranslations } from 'next-intl/server'

const categories = [
  {
    title: 'adverbs',
    class: 'adverbs'
  },
  {
    title: 'verbs',
    class: 'verbs'
  },
  {
    title: 'adjectives',
    class: 'adjectives'
  },
  {
    title: 'other',
    class: 'others'
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
          <h6 className={styles.title}>{t('categorized_wordlist')}</h6>
        </div>
        <div className={styles.categories}>
          {categories.map((item) => (
            <CategoryItem key={item.title} title={t(item.title)} cssClass={item.class} />
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
