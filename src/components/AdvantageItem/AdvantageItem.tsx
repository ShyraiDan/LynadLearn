import styles from './AdvantageItem.module.scss'
import { IAdvantage } from '@/interfaces/Advantage.interface'
import { useTranslations } from 'next-intl'

import { TiTickOutline } from 'react-icons/ti'

export default function AdvantageItem({ title, description }: IAdvantage) {
  const t = useTranslations('Home')

  return (
    <div className={styles.container}>
      <h6>{title}</h6>
      <div className={styles.description}>
        <TiTickOutline />
        <p>{t(`${description}`)}</p>
      </div>
    </div>
  )
}
