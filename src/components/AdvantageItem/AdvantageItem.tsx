import styles from './AdvantageItem.module.scss'
import { IAdvantage } from '@/interfaces/Advantage.interface'
import { useTranslations } from 'next-intl'
import { H6, P } from '@/components/ui/Typography/Typography'

import { TiTickOutline } from 'react-icons/ti'

export default function AdvantageItem({ title, description }: IAdvantage) {
  const t = useTranslations('Home')

  return (
    <div className={styles.container}>
      <H6 className="text-blue-200 font-bold duration-150 mb-2 sm:text-2xl dark:text-grey-600">{title}</H6>
      <div className={styles.description}>
        <TiTickOutline className="dark:text-grey-600" />
        <P className="mb-0 ml-1 text-sm font-medium dark:text-grey-600">{t(`${description}`)}</P>
      </div>
    </div>
  )
}
