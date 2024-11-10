import styles from './List.module.scss'
import { IList } from '@/interfaces/List.interface'
import Image from 'next/image'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'

interface TListProps extends Omit<IList, '_id'> {
  href: string
}

export default function List({ title, image, href }: TListProps) {
  const t = useTranslations('dashboard.lists')

  return (
    <div className={styles.container}>
      <NavigationLink href={href}>
        <div className={styles['image-cont']}>{image && <Image src={image} alt={title} />}</div>
        <span className={styles.title}>{t(title)}</span>
      </NavigationLink>
    </div>
  )
}
