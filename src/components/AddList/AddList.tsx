import styles from './AddList.module.scss'
import { useTranslations } from 'next-intl'

export default function AddList() {
  const t = useTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.container}>
        <div className={styles.photo}>+</div>
        <p>{t('add_list')}</p>
      </div>
    </>
  )
}
