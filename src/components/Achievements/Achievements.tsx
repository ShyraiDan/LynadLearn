import styles from './Achievements.module.scss'
import { IAchievement } from '@/interfaces/Achievements.interface'
import { useTranslations } from 'next-intl'
import { ISession } from '@/lib/auth'

export default function Achievements({ item, percent }: { item: IAchievement; percent: number }) {
  const t = useTranslations('achievement')

  return (
    <div className={`${styles.achievement} ${percent >= 1 && styles.reached}`}>
      <div className={styles.icon}>{<item.icon />}</div>
      <h6>{t(item.title)}</h6>
      <div className={styles.progress}>
        <div style={{ width: `${percent * 100 > 100 ? 100 : percent * 100}%` }}></div>
      </div>
      <p>{t(item.description)}</p>
    </div>
  )
}
