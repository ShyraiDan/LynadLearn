'use client'

import styles from './Flashcard.module.scss'
import { getWordsByListId } from '@/lib/word'
import { getListById } from '@/lib/lists'
import { useEffect, useState } from 'react'
import FlashCardWord from '@/components/FlashCardWord/FlashCardWord'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'
import { IWord } from '@/interfaces/Word.interface'
import { IList } from '@/interfaces/List.interface'
import Loader from '@/components/Loader/Loader'

import 'swiper/css'
import { TbCardsFilled, TbVocabulary } from 'react-icons/tb'

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

type TSingleFlashcardPage = {
  params: {
    id: string
    locale: string
  }
}

type TSlideContent = {
  isActive: boolean
  word: IWord
}

export default function SingleFlashcardPage({ params }: TSingleFlashcardPage) {
  const t = useTranslations('dashboard.flashcard')
  const [words, setWords] = useState<IWord[]>([])
  const [list, setList] = useState<IList | null>(null)
  const [loading, setLoading] = useState(true)
  const { id: listId } = params

  useEffect(() => {
    getWordsByListId(listId).then((data) => setWords(data))
    getListById(listId).then((data) => setList(data))

    setLoading(false)
  }, [])

  const SlideContent = ({ isActive, word }: TSlideContent) => {
    return (
      <>
        <div className={styles.flashcard}>
          <FlashCardWord word={word} isActive={isActive} />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      {!loading && list && words.length !== 0 && (
        <>
          <div className={styles.top}>
            <h2> {t('words_from', { list: list?.title })} </h2>
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
              {words.map((word, i) => (
                <SwiperSlide key={i}>{({ isActive }) => <SlideContent word={word} isActive={isActive} />}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      {!loading && !list && words.length === 0 && (
        <div className={styles['no-lists']}>
          <p>{t('no_lists')}</p>
          <NavigationLink href={'/dashboard/flashcard'} className={styles.links}>
            <TbCardsFilled />
            {t('move_flashcards')}
          </NavigationLink>
        </div>
      )}

      {!loading && list && words.length === 0 && (
        <div className={styles['no-lists']}>
          <p>{t('no_words')}</p>
          <NavigationLink href={`/dashboard/vocabulary/${listId}?sort=newest`} className={styles.links}>
            <TbVocabulary />
            {t('move_list')}
          </NavigationLink>
        </div>
      )}

      {loading && <Loader dimensionClass={styles.loader} />}
    </div>
  )
}
