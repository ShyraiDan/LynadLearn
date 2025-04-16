'use client'

import styles from './Flashcard.module.scss'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import FlashCardWord from '@/components/FlashCardWord/FlashCardWord'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'
import { IWord } from '@/interfaces/Word.interface'
import { IList } from '@/interfaces/List.interface'
import Loader from '@/components/Loader/Loader'
import { Modal } from '@/components/ui/Modal/Modal'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import 'swiper/css'
import { H2, H3, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

import { TbCardsFilled, TbVocabulary } from 'react-icons/tb'
import { ConfettiContainer } from '@/HOC/ConfettiContainer'
import { getSession } from '@/lib/auth'
import { updateUserByUserId } from '@/lib/user'
import { calculateUserScores } from '@/utils/calucalateUserScores'
import { toast } from 'sonner'

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
  const [isLast, setIsLast] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [initialWords, setInitialWords] = useState(0)
  const [wrongWords, setWrongWords] = useState<IWord[]>([])
  const { id: listId } = params
  const swiperRef = useRef<any>(null)
  const router = useRouter()

  const checkIfLastSlide = () => {
    if (!swiperRef.current) return false

    const swiperInstance = swiperRef.current
    const { activeIndex, slides } = swiperInstance
    const isLastSlide = activeIndex === slides.length - 1

    setIsLast(isLastSlide)
  }

  const showModal = () => {
    setIsFinished((state) => !state)
    router.back()
  }

  const {
    data: wordsData,
    isLoading: isWordsDataLoading,
    error: wordsDataError
  } = useSWR<IWord[]>(`/api/words/${listId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const {
    data: list,
    isLoading: isListDataLoading,
    error: listDataError
  } = useSWR<IList>(`/api/list/${listId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  useEffect(() => {
    if (wordsData) {
      setWords(wordsData)
      setInitialWords(wordsData.length)

      if (wordsData.length === 1) {
        setIsLast(true)
      }
    }
  }, [wordsData])

  const isLoading = isWordsDataLoading || isListDataLoading

  const updateUserScores = async () => {
    const session = await getSession()

    if (!session.userId) {
      return
    }

    const correct = initialWords - (words.length - initialWords)
    const isSuccessfullyCompletedFlashcards = correct / initialWords >= 0.7 ? true : false
    const earnedScores = calculateUserScores(correct, 'flashcard', isSuccessfullyCompletedFlashcards)

    const result = await updateUserByUserId(session.userId, {
      rating: earnedScores,
      wordLists: 0,
      totalQuizzes: 0,
      successfulQuizzes: 0,
      flashcardsLearned: initialWords,
      words: 0
    })

    if (!result.success) {
      toast.error('Error updating scores', {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

  useEffect(() => {
    if (isFinished) {
      updateUserScores()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished])

  // TODO: Add error handling
  return (
    <>
      <ConfettiContainer isVisible={isFinished} />
      <Container className={styles.container}>
        {!isLoading && list && words.length !== 0 && (
          <>
            <div className={styles.top}>
              <H2 className="text-blue-200 font-bold mb-0">{t('words_from', { list: list?.title })} </H2>
              <NavigationLink
                className={twMerge(styles.link, 'block whitespace-nowrap mt-1.5 dark:text-grey-600')}
                href={`/dashboard/vocabulary/${listId}`}
              >
                {t('view_list')}
              </NavigationLink>
            </div>
            <div className={styles['flashcard-slider']}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={() => checkIfLastSlide()}
                //TODO: Uncommit for production
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
                }}
              >
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

        {!isLoading && !list && words.length === 0 && (
          <div className={styles['no-lists']}>
            <P className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_lists')}</P>
            <NavigationLink href="/dashboard/flashcard" className={styles.links}>
              <TbCardsFilled />
              {t('move_flashcards')}
            </NavigationLink>
          </div>
        )}

        {!isLoading && list && words.length === 0 && (
          <div className={styles['no-lists']}>
            <P className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_words')}</P>
            <div className="flex gap-4">
              <NavigationLink href="/dashboard/flashcard" className={styles.links}>
                <TbCardsFilled />
                {t('move_flashcards')}
              </NavigationLink>
              <NavigationLink
                href={`/dashboard/vocabulary/${listId}?sort=newest`}
                className={twMerge(styles.links, 'min-w-[188px]')}
              >
                <TbVocabulary />
                {t('move_list')}
              </NavigationLink>
            </div>
          </div>
        )}

        {isLoading && <Loader dimensionClass={styles.loader} />}
      </Container>

      {isFinished && (
        <Modal
          className={twMerge(styles.finished, 'dark:bg-[#0B152E]')}
          isOpen={isFinished}
          handleClose={() => showModal()}
        >
          <div className={styles.modal}>
            <div>
              <div className={styles.top}>
                <H3 className="text-lg text-blue-200 font-bold text-center mb-0 sm:text-2xl sm:text-start md:text-3xl">
                  {t('congrats')}
                </H3>
                <P className="text-base text-center font-medium sm:text-start md:text-lg">
                  {t('you_learned', {
                    words: initialWords
                  })}
                </P>
              </div>
              <div className={twMerge(styles['new-words'], 'dark:!bg-[#1D2D4D]')}>
                <div className={styles.info}>
                  <P className="text-lg font-bold md:text-2xl">
                    {wrongWords.length === 0 ? t('no_difficult_words') : t('mistakes')}
                  </P>
                </div>
                <ul>
                  {wrongWords
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .map((word, i) => (
                      <li key={i} className="dark:!bg-[#16274A] dark:text-grey-600">
                        {word.word}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className={styles.bottom}>
              <NavigationLink className={styles.link} href="/dashboard/flashcard">
                {t('to_flashcards')}
              </NavigationLink>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
