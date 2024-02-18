import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'

export default function ListsPage() {
  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <h1>English Vocabulary</h1>
        <h2>Categorized word lists</h2>
      </div>
      <div className={styles['learn-vocabulary']}>
        <p>
          Start
          <br />
          Learning <span>English</span> Vocabulary
        </p>

        <div className={styles.arrow}>0</div>
      </div>

      {DCategories.map((item) => (
        <div key={item.id} className={styles.list}>
          <Category title={item.title} id={item.id} lists={item.lists} description={item.description} />
        </div>
      ))}
    </main>
  )
}
