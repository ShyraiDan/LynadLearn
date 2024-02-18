import styles from './AddNew.module.scss'

import { FaPlus } from 'react-icons/fa'

export default function AddNew() {
  return (
    <button className={styles.btn}>
      <FaPlus className={styles.plus} size={12} />
      New
    </button>
  )
}
