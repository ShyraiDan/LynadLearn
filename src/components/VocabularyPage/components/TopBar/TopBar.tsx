import styles from './TopBar.module.scss'
import { Input } from '@/components/ui/Input/Input'
import FilterWords from './components/FilterWords/FilterWords'
import { ITopBar } from './ITopBar.interface'

import { FaPlus } from 'react-icons/fa'

export default function TopBar({ isAdding, setAdding }: ITopBar) {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <FilterWords />
        <Input type='text' name='search' id='search' placeholder={'Search'} />
      </div>

      <div className={styles.add} onClick={() => setAdding(!isAdding)}>
        <FaPlus fill={'white'} size={16} />
      </div>
    </div>
  )
}
