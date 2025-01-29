import styles from './TopBar.module.scss'
import { Input } from '@/components/ui/Input/Input'
import FilterWords from './components/FilterWords/FilterWords'
import { AddingWordForm } from './components/AddingWordForm/AddingWordForm'
import { useTranslations } from 'next-intl'

export default function TopBar() {
  const t = useTranslations('dashboard.vocabulary')

  return (
    <>
      <div className={styles.container}>
        <div className={styles.filters}>
          <FilterWords />
          <Input type="text" name="search" id="search" placeholder={t('search')} />
        </div>
        <AddingWordForm />
      </div>
    </>
  )
}
