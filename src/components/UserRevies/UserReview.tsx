'use client'

import Image from 'next/image'
import styles from './UserReview.module.scss'
import { DReview } from '@/mock/Review.mock'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { IoStarSharp } from 'react-icons/io5'
import { FaGooglePlay } from 'react-icons/fa6'

export default function UserReview() {
  return (
    <>
      <Swiper
        navigation
        pagination={{
          type: 'bullets',
          dynamicBullets: true,
          dynamicMainBullets: 1
        }}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 3
          }
        }}
        modules={[Navigation, Pagination]}
        className='w-full rounded-lg'>
        {DReview.map((review, index) => {
          return (
            <SwiperSlide key={index}>
              <div key={review.id} className={styles.container}>
                <div className={styles.user}>
                  <Image src={review.avatar} alt='user-icon'></Image>
                  <p>{review.name}</p>
                </div>
                <p>{review.text}</p>
                <div className={styles.mark}>
                  <div className={styles.stars}>
                    <IoStarSharp size={'20px'} fill='#FFA944' />
                    <IoStarSharp size={'20px'} fill='#FFA944' />
                    <IoStarSharp size={'20px'} fill='#FFA944' />
                    <IoStarSharp size={'20px'} fill='#FFA944' />
                    <IoStarSharp size={'20px'} fill='#FFA944' />
                  </div>
                  <div className={styles.platform}>
                    <FaGooglePlay />
                    <p>Google Play</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
