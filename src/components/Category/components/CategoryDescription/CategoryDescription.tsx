import Link from 'next/link'
import styles from './CategoryDescription.module.scss'
import { ICategory } from '@/interfaces/Category.interface'
import { useTranslations } from 'next-intl'

export default function CategoryDescription({ title, description }: Omit<ICategory, 'lists' | '_id'>) {
  const t = useTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.top}>
        <h6 className={styles.title}>{t(title)}</h6>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>
          <h3 className={styles.title}>{t(title)}</h3>
          <p className={styles.desc}>{description && t(description)}</p>
        </div>
      </div>
    </>
  )
}
