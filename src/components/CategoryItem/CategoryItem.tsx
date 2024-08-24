import styles from './CategoryItem.module.scss'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

type TCategoryItem = {
  title: string
  cssClass: string
  href: string
}

export default function CategoryItem({ title, cssClass, href }: TCategoryItem) {
  return (
    <NavigationLink href={href}>
      <div className={`${styles['category-item']} ${styles[cssClass]}`}>{title}</div>
    </NavigationLink>
  )
}
