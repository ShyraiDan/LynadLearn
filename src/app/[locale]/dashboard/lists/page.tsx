import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import CustomCategory from '@/components/CustomCategory/CustomCategory'
import Loader from '@/components/Loader/Loader'

async function YourCategories() {
  const yourCategory = await getYourLists()

  return (
    <>
      <div className={styles.list}>
        <CustomCategory lists={yourCategory} />
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
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourCategories />
      </Suspense>
    </div>
  )
}
