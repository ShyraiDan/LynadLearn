'use client'

import styles from './Flashcard.module.scss'
import { getWordsByListId } from '@/lib/word'
import { getListById } from '@/lib/lists'
import { Suspense, useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'
import FlashCardWord from '@/components/FlashCardWord/FlashCardWord'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'

import 'swiper/css'

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const emptyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function SingleFlashcardPage({ params }: any) {
  const t = useTranslations('dashboard.flashcard')
  const [words, setWords] = useState([] as any)
  const [list, setList] = useState({} as any)
  const { id: listId } = params

  useEffect(() => {
    getWordsByListId(listId).then((data) => setWords(data))
    getListById(listId).then((data) => setList(data))
  }, [])

  const SlideContent = ({ ...props }) => {
    const { isActive } = props

    return (
      <>
        <div className={styles.flashcard}>
          <FlashCardWord words={''} isActive={isActive} />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2> {t('words_from', { list: list.title })} </h2>
        <NavigationLink href={`/dashboard/vocabulary/${listId}`}>{t('view_list')}</NavigationLink>
      </div>
      <div className={styles['flashcard-slider']}>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 1
            },
            800: {
              slidesPerView: 2
            },
            992: {
              slidesPerView: 2
            },
            1350: {
              slidesPerView: 3
            },
            1700: {
              slidesPerView: 4
            }
          }}>
          {emptyArray.map((item, i) => (
            <SwiperSlide key={i}>{SlideContent}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
