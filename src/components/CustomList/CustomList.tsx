import styles from './CustomList.module.scss'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import noImage from '@/assets/no-image.jpg'

export default function CustomList({ title, image }: { title: string; image?: string | StaticImport }) {
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
