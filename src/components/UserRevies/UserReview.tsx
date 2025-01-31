'use client'

import Image from 'next/image'
import styles from './UserReview.module.scss'
import { DReview } from '@/mock/Review.mock'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { P } from '@/components/ui/Typography/Typography'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { IoStarSharp } from 'react-icons/io5'
import { FaGooglePlay } from 'react-icons/fa6'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function UserReview() {
  return (
    <div className={styles.container}>
      <div className={styles['item-container']}>
        <Swiper
          navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left' }}
          pagination={{
            type: 'bullets',
            dynamicBullets: true,
            dynamicMainBullets: 1
          }}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3
            }
          }}
          modules={[Navigation, Pagination]}
          className="w-full rounded-lg"
        >
          {DReview.map((review, index) => {
            return (
              <SwiperSlide key={index}>
                <div key={review.id} className={`${styles.item} dark:bg-[#050e26]`}>
                  <div className={styles.user}>
                    <Image src={review.avatar} alt="user-icon"></Image>
                    <P className="font-bold">{review.name}</P>
                  </div>
                  <P className="text-sm mb-2 font-medium">{review.text}</P>
                  <div className={styles.mark}>
                    <div className={styles.stars}>
                      <IoStarSharp size="20px" />
                      <IoStarSharp size="20px" />
                      <IoStarSharp size="20px" />
                      <IoStarSharp size="20px" />
                      <IoStarSharp size="20px" />
                    </div>
                    <div className={styles.platform}>
                      <FaGooglePlay className="dark:text-grey-600" />
                      <P className="font-medium text-[#949494]">Google Play</P>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        <div className={styles.btns}>
          <button className={`arrow-left ${styles['arrow-left']} dark:text-grey-600`}>
            <IoIosArrowBack size={28} />
          </button>
          <button className={`arrow-right ${styles['arrow-right']} dark:text-grey-600`}>
            <IoIosArrowForward size={28} />
          </button>
        </div>
      </div>
    </div>
  )
}
