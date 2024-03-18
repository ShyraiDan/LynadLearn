import styles from './Sectionitem.module.scss'
import Image from 'next/image'
import { ISections } from '@/interfaces/Sections.interface'

export const SectionItem = ({ title, icon, text }: ISections) => {
  return (
    <div className={styles.item}>
      <div>
        <Image src={icon} alt={title} />
        <h3>{title}</h3>
      </div>
      <p>{text}</p>
    </div>
  )
}
