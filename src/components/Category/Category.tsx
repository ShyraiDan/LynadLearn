'use client'

import { IDefaultCollectionGroup } from '@/interfaces/DefaultCollectionGroup.interface'
import styles from './Category.module.scss'
import List from '@/components/List/List'
import { H3, P } from '../ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'

import 'swiper/css'
import 'swiper/css/pagination'

interface CategoryProps {
  collection: IDefaultCollectionGroup
}

export function Category({ collection }: CategoryProps) {
  const t = useTranslations('dashboard.lists')
  return (
    <div className={twMerge(styles.container, 'dark:bg-none dark:bg-blue-600')}>
      <div>
        <div className={styles.top}>
          <H3 className="font-bold text-[16px] text-blue-150 md:mb-0">{t(collection.title)}</H3>
        </div>
        <div className={twMerge(styles['list-group'], 'dark:!bg-[#18223D]')}>
          <div className="hidden md:block mt-2 max-w-[350px] pr-4 md:pr-8">
            <H3 className="text-blue-150 text-2xl font-bold sm:mb-3 md:text-3xl">{t(collection.title)}</H3>
            <P className="py-2 text-blue-350 font-medium">{t(collection.description)}</P>
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-4">
            {collection.collections.map((item) => (
              <List key={item.id} title={item.title} image={item.image} href={`/dashboard/lists/${item.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
