'use client'

import Link from 'next/link'
import { ICategory } from '@/interfaces/Category.interface'
import styles from './Category.module.scss'
import List from '../List/List'
import CategoryDescription from './components/CategoryDescription/CategoryDescription'
import AddList from '../AddList/AddList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

export function Category({ title, id, lists, description }: ICategory) {
  return (
    <div className={styles.container}>
      <div>
        <CategoryDescription title={title} description={description} id={id} />
        <div className={styles['list-group']}>
          {title === 'Your Word Lists' && <AddList />}

          <Swiper
            pagination={true}
            modules={[Pagination]}
            className={styles.slider}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10
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
              768: {
                slidesPerView: 2
              },
              840: {
                slidesPerView: 3
              },
              992: {
                slidesPerView: 4
              },
              1150: {
                slidesPerView: 5
              }
            }}>
            {lists.map((item) => (
              <SwiperSlide key={item.id}>
                <List id={item.id} title={item.title} image={item.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
