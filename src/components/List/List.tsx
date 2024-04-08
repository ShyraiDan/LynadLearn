import styles from './List.module.scss'
import { IList } from '@/interfaces/List.interface'
import Image from 'next/image'

export default function List({ id, title, image }: IList) {
  return (
    <div key={id} className={styles.container}>
      <div className={styles['image-cont']}>{image && <Image src={image} alt={title} />}</div>
      <span className={styles.title}>{title}</span>
    </div>
  )
}
