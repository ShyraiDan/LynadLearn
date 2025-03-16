'use client'

import { IDefaultCollectionGroup } from '@/interfaces/DefaultCollectionGroup.interface'
import styles from './Category.module.scss'
import List from '@/components/List/List'
import CategoryDescription from './components/CategoryDescription/CategoryDescription'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { twMerge } from 'tailwind-merge'

import 'swiper/css'
import 'swiper/css/pagination'

interface CategoryProps {
  collection: IDefaultCollectionGroup
}

export function Category({ collection }: CategoryProps) {
  return (
    <div className={twMerge(styles.container, 'dark:bg-none dark:bg-blue-600')}>
      <div>
        <CategoryDescription title={collection.title} description="" />
        <div className={styles['list-group']}>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            // className={styles.slider}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2
              },
              400: {
                slidesPerView: 3
              },
              510: {
                slidesPerView: 4
              },
              576: {
                slidesPerView: 3
              },
              700: {
                slidesPerView: 4
              },
              840: {
                slidesPerView: 5
              },
              992: {
                slidesPerView: 4
              },
              1150: {
                slidesPerView: 5
              },
              1300: {
                slidesPerView: 6
              },
              1450: {
                slidesPerView: 7
              },
              1600: {
                slidesPerView: 8
              }
            }}
          >
            {collection.collections.map((item) => (
              <SwiperSlide key={item.id}>
                <List title={item.title} image={item.image} href={`/dashboard/lists/${item.id}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
