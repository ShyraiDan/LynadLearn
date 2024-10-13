'use client'

import { ICategory } from '@/interfaces/Category.interface'
import styles from './Category.module.scss'
import List from '@/components/List/List'
import CategoryDescription from './components/CategoryDescription/CategoryDescription'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

export function Category({ title, lists, description }: Omit<ICategory, '_id'>) {
  return (
    <div className={styles.container}>
      <div>
        <CategoryDescription title={title} description={description} />
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
            }}>
            {lists.map((item) => (
              <SwiperSlide key={item._id}>
                <List title={item.title} image={item.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
