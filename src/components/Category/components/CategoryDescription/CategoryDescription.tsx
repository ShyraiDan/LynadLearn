import styles from './CategoryDescription.module.scss'
import { ICategory } from '@/interfaces/Category.interface'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

//TODO: remove description walking

export default function CategoryDescription({ title, description }: Omit<ICategory, 'lists' | '_id'>) {
  const t = useTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.top}>
        <h6 className={twMerge(styles.title, 'dark:text-grey-600')}>{t(title)}</h6>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>
          <h3 className={twMerge(styles.title, 'dark:text-grey-600')}>{t(title)}</h3>
          <p className={styles.desc}>{description && t(description)}</p>
        </div>
      </div>
    </>
  )
}
