import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'
import { getYourLists } from '@/lib/lists'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'
import CustomCategory from '@/components/CustomCategory/CustomCategory'
import Loader from '@/components/Loader/Loader'

async function YourCategories({ title }: any) {
  const yourCategory = await getYourLists()

  return (
    <>
      <div className={styles.list}>
        <CustomCategory title={title} _id={title} lists={yourCategory} description={''} />
      </div>

      {DCategories.map((item) => (
        <div key={item._id} className={styles.list}>
          <Category title={item.title} _id={item._id} lists={item.lists} description={item.description} />
        </div>
      ))}
    </>
  )
}

export default function ListsPage() {
  const t = useTranslations()

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourCategories title={t('your_lists')} />
      </Suspense>
    </div>
  )
}
