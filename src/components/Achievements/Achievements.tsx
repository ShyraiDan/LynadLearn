import styles from './Achievements.module.scss'
import { IAchievement } from '@/interfaces/Achievements.interface'
import { twMerge } from 'tailwind-merge'
import { H6, P } from '@/components/ui/Typography/Typography'
import Image from 'next/image'

//TODO: check background for reached achievements

interface IAchievementsProps {
  item: IAchievement
  percent: number
  locale: string
}

export default function Achievements({ item, percent, locale }: IAchievementsProps) {
  return (
    <div className={twMerge(styles.achievement, percent >= 1 && styles.reached, 'dark:bg-[#1D2D4D]')}>
      <div className={styles.icon}>
        <Image
          src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${item.image}`}
          alt={item.title}
          width={20}
          height={20}
          className="dark:invert"
        />
        <div />
      </div>
      <H6 className="text-[16px] dark:text-grey-600 !mb-2 !mt-1">{locale === 'ua' ? item.titleUa : item.title}</H6>
      <div className={styles.progress}>
        <div style={{ width: `${percent * 100 > 100 ? 100 : percent * 100}%` }}></div>
      </div>
      <P className="text-[12px] text-center leading-6 dark:text-grey-600">
        {locale === 'ua' ? item.descriptionUa : item.description}
      </P>
    </div>
  )
}
