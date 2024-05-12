import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'

export default function ListsPage() {
  return (
    <div className={styles.container}>
      {DCategories.map((item) => (
        <div key={item.id} className={styles.list}>
          <Category title={item.title} id={item.id} lists={item.lists} description={item.description} />
        </div>
      ))}
    </div>
  )
}
