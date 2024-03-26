import styles from './TopBar.module.scss'
import { Input } from '../ui/Input/Input'
import FilterWords from './components/FilterWords/FilterWords'

import { FaPlus } from 'react-icons/fa'

export default function TopBar() {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <FilterWords />
        <Input type='text' name='search' id='search' placeholder={'Search'} />
      </div>

      <div className={styles.add}>
        <FaPlus fill={'white'} size={16} />
      </div>
    </div>
  )
}
