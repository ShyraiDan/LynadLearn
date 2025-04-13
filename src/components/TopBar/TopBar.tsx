import styles from './TopBar.module.scss'
import { Input } from '@/components/ui/Input/Input'
import FilterWords from './components/FilterWords/FilterWords'
import { AddingWordForm } from './components/AddingWordForm/AddingWordForm'
import { useTranslations } from 'next-intl'
import { ManageListModal } from './components/ManageListModal/ManageListModal'

interface TopBarProps {
  listId: string
}

export default function TopBar({ listId }: TopBarProps) {
  const t = useTranslations('dashboard.vocabulary')

  return (
    <>
      <div className="mb-4">
        <div className={styles['filters-sorting']}>
          <div className={styles.filters}>
            <FilterWords />
            <div className="hidden sm:block mt-[-8px]">
              <Input type="text" name="search" id="search" placeholder={t('search')} />
            </div>
          </div>
          <div className="flex gap-3">
            <AddingWordForm />
            <ManageListModal listId={listId} />
          </div>
        </div>
        <div className="block sm:hidden mt-[-8px]">
          <Input type="text" name="search" id="search" placeholder={t('search')} />
        </div>
      </div>
    </>
  )
}
