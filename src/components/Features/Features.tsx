'use client'

import styles from './Features.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import book from '@/assets/icons/book.svg'

export default function Features() {
  return (
    <Swiper navigation pagination={{}} modules={[]}>
      <SwiperSlide>
        <div className={styles['slider-item']}>
          <div>
            <Image src={book} alt='book' />
            <h6>Grammar</h6>
          </div>
          <p>
            In the Grammar section, you have access to a complete grammar library of the desired language, which is
            categorized by topic. This library is searchable and you can learn grammar from it through different topics.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles['slider-item']}>
          <div>
            <Image src={book} alt='book' />
            <h6>Pronunciation</h6>
          </div>
          <p>
            The pronunciation feature of LanGeek app helps users improve their pronunciation skills through native
            speaker recordings, pronunciation guides, interactive exercises, as well as pronunciation tips and
            resources.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
