import Link from 'next/link'
import styles from './CategoryDescription.module.scss'
import { ICategory } from '@/interfaces/Category.interface'

export default function CategoryDescription({ title, id, description }: Omit<ICategory, 'lists'>) {
  return (
    <>
      <div className={styles.top}>
        <h6 className={styles.title}>{title}</h6>
        <Link href={`/lists:${id}`}>See all</Link>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles['link-cont']}>
          <Link className={styles.link} href={`/lists:${id}`}>
            Explore
          </Link>
        </div>
      </div>
    </>
  )
}
