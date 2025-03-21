import styles from './CustomCategory.module.scss'
import { IList } from '@/interfaces/List.interface'
import { useTranslations } from 'next-intl'
import CategoryDescription from '@/components/Category/components/CategoryDescription/CategoryDescription'
import AddList from '@/components/AddList/AddList'
import CustomList from '@/components/CustomList/CustomList'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { twMerge } from 'tailwind-merge'

interface CustomCategoryProps {
  lists: IList[]
}

export default function CustomCategory({ lists }: CustomCategoryProps) {
  const t = useTranslations()

  return (
    <div className={twMerge(styles.container, 'dark:bg-none dark:bg-blue-600')}>
      <div>
        <CategoryDescription title={t('your_lists')} description="" />
        <div className={twMerge(styles['list-group'], 'dark:!bg-[#1D2D4D]')}>
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
