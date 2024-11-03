import styles from './Achievements.module.scss'
import { IAchievement } from '@/interfaces/Achievements.interface'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

//TODO: check background for reached achievements

export default function Achievements({ item, percent }: { item: IAchievement; percent: number }) {
  const t = useTranslations('achievement')

  return (
    <div className={twMerge(styles.achievement, percent >= 1 && styles.reached, 'dark:bg-[#1D2D4D]')}>
      <div className={styles.icon}>{<item.icon className='dark:fill-grey-600' />}</div>
      <h6 className='dark:text-grey-600'>{t(item.title)}</h6>
      <div className={styles.progress}>
        <div style={{ width: `${percent * 100 > 100 ? 100 : percent * 100}%` }}></div>
      </div>
      <p className='dark:text-grey-600'>{t(item.description)}</p>
    </div>
  )
}
