'use client'

import styles from './Features.module.scss'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { DFeatures } from '@/mock/Features.mock'
import { useTranslations } from 'next-intl'
import { H6, P } from '@/components/ui/Typography/Typography'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function Features() {
  const t = useTranslations('Mobile_app')

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
            modules={[Navigation, Pagination]}
          >
            {DFeatures.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className={styles.item}>
                    <div>
                      <Image src={item.icon} alt="book" />
                      <H6 className="dark:text-grey-600">{t(item.title)}</H6>
                    </div>
                    <P className="text-sm text-black mb-0 mt-5 font-medium lg:text-base">{t(item.description)}</P>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className={styles.btns}>
            <button className={`features-left ${styles['arrow-left']} dark:text-grey-600`}>
              <IoIosArrowBack size={28} />
            </button>
            <button className={`features-right ${styles['arrow-right']} dark:text-grey-600`}>
              <IoIosArrowForward size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
