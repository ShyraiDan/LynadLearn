import styles from './CustomList.module.scss'
import Image from 'next/image'
import { IList } from '@/interfaces/List.interface'
import { P } from '@/components/ui/Typography/Typography'

import noImage from '@/assets/no-image.jpg'

export default function CustomList({ title, image }: Omit<IList, 'words' | '_id'>) {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        {!image && <Image src={noImage} alt={title} />}
        {image && <Image src={image} alt={title} />}
      </div>
      <P className="w-[100px] text-center cursor-pointer text-[1rem] sm:w-[135px]">{title}</P>
    </div>
  )
}
