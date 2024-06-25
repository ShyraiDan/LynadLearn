import styles from './CustomList.module.scss'
import Image from 'next/image'
import { IList } from '@/interfaces/List.interface'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

import noImage from '@/assets/no-image.jpg'

export default function CustomList({ title, image, _id }: Omit<IList, 'words'>) {
  return (
    <NavigationLink href={`/dashboard/vocabulary/${_id}`}>
      <div className={styles.container}>
        <div className={styles.photo}>
          {!image && <Image src={noImage} alt={title} />}
          {image && <Image src={image} alt={title} />}
        </div>
        <p>{title}</p>
      </div>
    </NavigationLink>
  )
}
