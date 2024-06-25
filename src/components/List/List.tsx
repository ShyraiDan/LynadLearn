import styles from './List.module.scss'
import { IList } from '@/interfaces/List.interface'
import Image from 'next/image'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

export default function List({ title, image }: Omit<IList, '_id'>) {
  return (
    <div className={styles.container}>
      <NavigationLink href={`/dashboard/vocabulary`}>
        <div className={styles['image-cont']}>{image && <Image src={image} alt={title} />}</div>
        <span className={styles.title}>{title}</span>
      </NavigationLink>
    </div>
  )
}
