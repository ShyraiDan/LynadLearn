import styles from './List.module.scss'
import { IList } from '@/intefaces/List.interface'
import Image from 'next/image'

export default function List({ id, title, image }: IList) {
  return (
    <div className={styles.container}>
      <div className={styles['image-cont']}>
        <Image src={image} alt={title} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  )
}
