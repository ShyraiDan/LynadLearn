import styles from './CategoryItem.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { twMerge } from 'tailwind-merge'
import { P } from '../ui/Typography/Typography'

type TCategoryItem = {
  title: string
  cssClass: string
  href: string
}

export default function CategoryItem({ title, cssClass, href }: TCategoryItem) {
  return (
    <NavigationLink className="relative" href={href}>
      <div
        className={twMerge(styles['category-item'], styles[cssClass], 'dark:brightness-75 dark:text-white-100')}
      ></div>
      <P
        className={twMerge(
          styles[`${cssClass}-text`],
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold capitalize dark:text-white-100 '
        )}
      >
        {title}
      </P>
    </NavigationLink>
  )
}
