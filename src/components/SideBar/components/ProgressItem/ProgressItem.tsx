import styles from './Progress.module.scss'

import { TbChartHistogram } from 'react-icons/tb'

export default function ProgressItem() {
  return (
    <li className={styles.item}>
      <div className={styles.title}>
        <TbChartHistogram className={styles.icon} size={14} />
        Fleshcard Progress
      </div>
      <ul>
        <li>Percentage: 100%</li>
        <li>Total cards: 34</li>
        <li>Correct cards: 34</li>
        <li>Failed cards: 0</li>
      </ul>
    </li>
  )
}
