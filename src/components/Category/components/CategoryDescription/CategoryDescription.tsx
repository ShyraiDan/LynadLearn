import styles from './CategoryDescription.module.scss'
import { useTranslations } from 'next-intl'
import { H3, H6, P } from '@/components/ui/Typography/Typography'

//TODO: remove description walking

interface CategoryDescriptionProps {
  title: string
  description: string
}

export default function CategoryDescription({ title, description }: CategoryDescriptionProps) {
  const t = useTranslations('dashboard.lists')

  return (
    <>
      <div className={styles.top}>
        <H6 className="font-bold mb-2 text-blue-150 md:mb-0">{t(title)}</H6>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>
          <H3 className="text-blue-150 text-2xl font-bold sm:mb-3 md:text-3xl">{t(title)}</H3>
          <P className=" py-2 text-blue-350 font-medium">{description && t(description)}</P>
        </div>
      </div>
    </>
  )
}
