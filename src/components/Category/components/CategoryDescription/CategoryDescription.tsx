import Link from 'next/link'
import styles from './CategoryDescription.module.scss'
import { ICategory } from '@/interfaces/Category.interface'
import { useTranslations } from 'next-intl'

export default function CategoryDescription({ title, id, description }: Omit<ICategory, 'lists'>) {
  const t = useTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.top}>
        <h6 className={styles.title}>{t(title)}</h6>
        <Link href={`/lists:${id}`}>{t('see_all')}</Link>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>
          <h3 className={styles.title}>{t(title)}</h3>
          <p className={styles.desc}>{t(description)}</p>
        </div>
        <div className={styles['link-cont']}>
          <Link className={styles.link} href={`/lists:${id}`}>
            {t('explore')}
          </Link>
        </div>
      </div>
    </>
  )
}
