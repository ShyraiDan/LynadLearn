'use client'

import styles from './Features.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { DFeatures } from '@/mock/Features.mock'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import book from '@/assets/icons/book.svg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function Features() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles['item-container']}>
          <Swiper
            navigation={{ nextEl: '.features-right', prevEl: '.features-left' }}
            pagination={{
              type: 'bullets',
              dynamicBullets: true,
              dynamicMainBullets: 1
            }}
            centeredSlides={true}
            spaceBetween={20}
            slidesPerView={1}
            modules={[Navigation, Pagination]}>
            {DFeatures.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className={styles.item}>
                    <div>
                      <Image src={item.icon} alt='book' />
                      <h6>{item.title}</h6>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className={styles.btns}>
            <button className={`features-left ${styles['arrow-left']}`}>
              <IoIosArrowBack size={28} />
            </button>
            <button className={`features-right ${styles['arrow-right']}`}>
              <IoIosArrowForward size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
