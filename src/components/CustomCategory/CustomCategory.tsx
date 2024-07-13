import styles from './CustomCategory.module.scss'
import { ICategory } from '@/interfaces/Category.interface'
import { useTranslations } from 'next-intl'
import CategoryDescription from '../Category/components/CategoryDescription/CategoryDescription'
import AddList from '../AddList/AddList'
import CustomList from '../CustomList/CustomList'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { IList } from '@/interfaces/List.interface'

export default function CustomCategory({ lists }: Pick<ICategory, 'lists'>) {
  const t = useTranslations()

  return (
    <div className={styles.container}>
      <div>
        <CategoryDescription title={t('your_lists')} description={''} />
        <div className={styles['list-group']}>
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
