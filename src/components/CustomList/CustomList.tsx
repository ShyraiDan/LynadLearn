import styles from './CustomList.module.scss'
import Image from 'next/image'
import { IList } from '@/interfaces/List.interface'

import noImage from '@/assets/no-image.jpg'

export default function CustomList({ title, image }: Omit<IList, 'words' | '_id'>) {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        {!image && <Image src={noImage} alt={title} />}
        {image && <Image src={image} alt={title} />}
      </div>
      <p>{title}</p>
    </div>
  )
}
