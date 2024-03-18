import Link from 'next/link'
import { ICategory } from '@/interfaces/Category.interface'
import styles from './Category.module.scss'
import List from '../List/List'
import CategoryDescription from './components/CategoryDescription/CategoryDescription'
import AddList from '../AddList/AddList'

export function Category({ title, id, lists, description }: ICategory) {
  return (
    <div className={styles.container}>
      <CategoryDescription title={title} description={description} id={id} />
      <div className={styles['list-group']}>
        {lists.map((item) => (
          <List key={item.id} id={item.id} title={item.title} image={item.image} />
        ))}
        {title === 'Your Word Lists' && <AddList />}
      </div>
    </div>
  )
}
