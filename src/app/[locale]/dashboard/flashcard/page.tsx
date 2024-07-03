import styles from './Flashcard.module.scss'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import CustomList from '@/components/CustomList/CustomList'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'

async function YourLists() {
  const lists = await getYourLists()

  return (
    <>
      <h2>Flashcard page</h2>
      <div className={styles.sections}>
        <div className={styles.top}>
          <h4>Choose a word list to learn:</h4>
        </div>
        <div className={styles.items}>
          {lists.map((item) => (
            <div key={item._id} className={styles.item}>
              <NavigationLink href={`/dashboard/flashcard/${item._id}`}>
                <CustomList title={item.title} image={item.image} _id={item._id} />
              </NavigationLink>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default function FlashcardPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourLists />
      </Suspense>
    </div>
  )
}
