import styles from './Achievements.module.scss'
import { IAchievement } from '@/interfaces/Achievements.interface'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { H6, P } from '@/components/ui/Typography/Typography'

//TODO: check background for reached achievements

export default function Achievements({ item, percent }: { item: IAchievement; percent: number }) {
  const t = useTranslations('achievement')

  return (
    <div className={twMerge(styles.achievement, percent >= 1 && styles.reached, 'dark:bg-[#1D2D4D]')}>
      <div className={styles.icon}>{<item.icon className="dark:fill-grey-600" />}</div>
      <H6 className="text-[16px] dark:text-grey-600">{t(item.title)}</H6>
      <div className={styles.progress}>
        <div style={{ width: `${percent * 100 > 100 ? 100 : percent * 100}%` }}></div>
      </div>
      <P className="text-[12px] text-center leading-6 dark:text-grey-600">{t(item.description)}</P>
    </div>
  )
}
