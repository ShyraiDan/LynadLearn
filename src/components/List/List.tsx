import styles from './List.module.scss'
import { IList } from '@/interfaces/List.interface'
import Image from 'next/image'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'

export default function List({ title, image }: Omit<IList, '_id'>) {
  const t = useTranslations('dashboard.lists')

  return (
    <div className={styles.container}>
      <NavigationLink href={`/dashboard/lists/1`}>
        <div className={styles['image-cont']}>{image && <Image src={image} alt={title} />}</div>
        <span className={styles.title}>{t(title)}</span>
      </NavigationLink>
    </div>
  )
}
