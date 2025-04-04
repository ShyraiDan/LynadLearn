import styles from './CustomCategory.module.scss'
import { IList } from '@/interfaces/List.interface'
import { useTranslations } from 'next-intl'
import AddList from '@/components/AddList/AddList'
import CustomList from '@/components/CustomList/CustomList'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { twMerge } from 'tailwind-merge'
import { H3 } from '../ui/Typography/Typography'
import CategoryDescription from '../Category/components/CategoryDescription/CategoryDescription'

interface CustomCategoryProps {
  lists: IList[]
}

export default function CustomCategory({ lists }: CustomCategoryProps) {
  const t = useTranslations()

  return (
    <div className={twMerge(styles.container, 'dark:bg-none dark:bg-blue-600')}>
      <div>
        <CategoryDescription title={t('your_lists')} />
        <div className={twMerge(styles['list-group'], 'dark:!bg-[#18223D]')}>
          <AddList />
          {lists.map((item: IList) => (
            <NavigationLink key={item._id} href={`/dashboard/vocabulary/${item._id}?sort=newest`}>
              <CustomList title={item.title} image={item.image} />
            </NavigationLink>
          ))}
        </div>
      </div>
    </div>
  )
}
