import styles from './AdvantageItem.module.scss'
import { IAdvantage } from '@/intefaces/Advantage.interface'

import { TiTickOutline } from 'react-icons/ti'

export default function AdvantageItem({ title, description }: IAdvantage) {
  return (
    <div className={styles.container}>
      <h6>{title}</h6>
      <div className={styles.description}>
        <TiTickOutline />
        <p>{description}</p>
      </div>
    </div>
  )
}
