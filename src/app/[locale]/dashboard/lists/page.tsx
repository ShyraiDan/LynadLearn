import styles from './ListsPage.module.scss'
import { Category } from '@/components/Category/Category'
import { DCategories } from '@/mock/Categories.mock'
import Image from 'next/image'

import line from '@/assets/line.svg'

export default function ListsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>English Vocabulary</h1>
        <Image src={line} alt='line' />
        <p>Lets start your journey to learn categorized English vocabulary on Langeek.</p>
      </div>
      {DCategories.map((item) => (
        <div key={item.id} className={styles.list}>
          <Category title={item.title} id={item.id} lists={item.lists} description={item.description} />
        </div>
      ))}
    </div>
  )
}
