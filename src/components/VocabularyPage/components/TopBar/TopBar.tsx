import styles from './TopBar.module.scss'
import { Input } from '@/components/ui/Input/Input'
import FilterWords from './components/FilterWords/FilterWords'
import { AddingWordForm } from './components/AddingWordForm/AddingWordForm'

export default function TopBar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.filters}>
          <FilterWords />
          <Input type='text' name='search' id='search' placeholder={'Search'} />
        </div>
        <AddingWordForm />
      </div>
    </>
  )
}
