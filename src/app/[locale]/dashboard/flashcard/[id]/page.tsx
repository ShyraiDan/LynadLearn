'use client'

import styles from './Flashcard.module.scss'
import { getWordsByListId } from '@/lib/word'
import { getListById } from '@/lib/lists'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import FlashCardWord from '@/components/FlashCardWord/FlashCardWord'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'
import { IWord } from '@/interfaces/Word.interface'
import { IList } from '@/interfaces/List.interface'
import Loader from '@/components/Loader/Loader'
import { Modal } from '@/components/ui/Modal/Modal'
import { Button } from '@/components/ui/Button/Button'
import { twMerge } from 'tailwind-merge'
import 'swiper/css'

import { TbCardsFilled, TbVocabulary } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'

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
  isLast: boolean
  setWords: Dispatch<SetStateAction<IWord[]>>
  setIsFinished: Dispatch<SetStateAction<boolean>>
  setWrongWords: Dispatch<SetStateAction<IWord[]>>
}

const SlideContent = ({ isActive, word, isLast, setWords, setIsFinished, setWrongWords }: TSlideContent) => {
  return (
    <>
      <div className={styles.flashcard}>
        <FlashCardWord
          word={word}
          isActive={isActive}
          isLast={isLast}
          setWords={setWords}
          setFinished={setIsFinished}
          setWrongWords={setWrongWords}
        />
      </div>
    </>
  )
}

export default function SingleFlashcardPage({ params }: TSingleFlashcardPage) {
  const t = useTranslations('dashboard.flashcard')
  const [words, setWords] = useState<IWord[]>([])
  const [list, setList] = useState<IList | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLast, setIsLast] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [initialWords, setInitialWords] = useState(0)
  const [wrongWords, setWrongWords] = useState<IWord[]>([])
  const { id: listId } = params
  const swiperRef = useRef<any>(null)

  const checkIfLastSlide = () => {
    if (!swiperRef.current) return false

    const swiperInstance = swiperRef.current
    const { activeIndex, slides } = swiperInstance
    const isLastSlide = activeIndex === slides.length - 1

    setIsLast(isLastSlide)
  }

  const showModal = () => {
    setIsFinished((state) => !state)
  }

  useEffect(() => {
    getWordsByListId(listId).then((data) => {
      setWords(data)
      setInitialWords(data.length)
    })
    getListById(listId).then((data) => setList(data))

    setLoading(false)
  }, [])

  return (
    <>
      <div className={styles.container}>
        {!loading && list && words.length !== 0 && (
          <>
            <div className={styles.top}>
              <h2 className={twMerge(styles.title, 'dark:text-grey-600')}>{t('words_from', { list: list?.title })} </h2>
              <NavigationLink
                className={twMerge(styles.link, 'dark:text-grey-600')}
                href={`/dashboard/vocabulary/${listId}`}>
                {t('view_list')}
              </NavigationLink>
            </div>
            <div className={styles['flashcard-slider']}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={() => checkIfLastSlide()}
                // allowTouchMove={false}
                // noSwiping={true}
                // simulateTouch={false}
                spaceBetween={20}
                centeredSlides={true}
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
                  <SwiperSlide key={i}>
                    {({ isActive }) => (
                      <SlideContent
                        word={word}
                        isActive={isActive}
                        isLast={isLast}
                        setWords={setWords}
                        setIsFinished={setIsFinished}
                        setWrongWords={setWrongWords}
                      />
                    )}
                  </SwiperSlide>
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

      {isFinished && (
        <Modal className={styles.finished} isOpen={isFinished} handleClose={() => showModal()}>
          <div className={styles.modal}>
            <div>
              <div className={styles.top}>
                <h3>{t('congrats')}</h3>
                <p>
                  {t('you_learned', {
                    words: initialWords
                  })}
                </p>
              </div>
              <div className={styles['new-words']}>
                <div className={styles.info}>
                  <p>{wrongWords.length === 0 ? t('no_difficult_words') : t('add_difficult_words')}</p>
                  {wrongWords.length > 0 && (
                    <Button className={styles.btn}>
                      <FaPlus size={20} />
                    </Button>
                  )}
                </div>
                <ul>
                  {wrongWords
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .map((word, i) => (
                      <li key={i}>{word.word}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className={styles.bottom}>
              <NavigationLink className={styles.link} href={'/dashboard/flashcard'}>
                {t('to_flashcards')}
              </NavigationLink>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
