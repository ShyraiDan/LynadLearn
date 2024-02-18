import styles from './SideBar.module.scss'
import Link from 'next/link'
import AddNew from './components/AddNew/AddNew'
import ProgressItem from './components/ProgressItem/ProgressItem'

import { FaChartPie } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa6'
import { TbCardsFilled } from 'react-icons/tb'

export default function SideBar() {
  return (
    <div className={styles.container}>
      <section>
        <h3>Progress</h3>
        <div>
          <FaChartPie className={styles.diagram} size={14} />
          Statistics
          <FaChevronDown className={styles.arrow} size={10} />
        </div>
        <ul className={styles.accordion}>
          <ProgressItem />
        </ul>
        <AddNew />
      </section>
      <section>
        <div>
          <TbCardsFilled className={styles.diagram} size={14} />
          Flashcards
          <FaChevronDown className={styles.arrow} size={10} />
        </div>
        <ul></ul>
        <AddNew />
      </section>
    </div>
  )
}
