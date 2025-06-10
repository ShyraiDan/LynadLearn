'use client'

import styles from './Flashcard.module.scss'
import { addMultipleWords } from '@/lib/word'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import FlashCardWord from '@/components/FlashCardWord/FlashCardWord'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'
import { IWord } from '@/interfaces/Word.interface'
import Loader from '@/components/Loader/Loader'
import { Modal } from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import 'swiper/css'
import { H2, P, H3 } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'

import { TbCardsFilled } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import CustomList from '@/components/CustomList/CustomList'
import { getSession, ISession } from '@/lib/auth'
import { toast } from 'sonner'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { ISection } from '@/interfaces/Section.interface'
import { IList } from '@/interfaces/List.interface'
import { ConfettiContainer } from '@/HOC/ConfettiContainer'
import { updateUserByUserId } from '@/lib/user'
import { calculateUserScores } from '@/utils/calucalateUserScores'

type TSingleFlashcardPage = {
  params: {
    sectionId: string
    collectionId: string
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
  const [userListsModal, setUserListsModal] = useState(false)
  const [session, setSession] = useState<ISession>()
  const { sectionId, collectionId, locale } = params
  const swiperRef = useRef<any>(null)
  const router = useRouter()
  const [isSessionLoading, setSessionLoading] = useState(true)

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
    data: wordSection,
    isLoading: isLoadingWordSection,
    error: errorWordSection
  } = useSWR<ISection>(`/api/section/${sectionId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const { data: userLists, isLoading: isLoadingUserLists } = useSWR<IList[]>(
    session?.userId ? `/api/userLists/${session.userId}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false
    }
  )

  useEffect(() => {
    if (wordSection) {
      setWords(wordSection.words)
      setInitialWords(wordSection.words.length)
    }
  }, [wordSection])

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })

    setSessionLoading(false)
  }, [])

  const addWordsToList = async (listId: string) => {
    const res = await addMultipleWords(wrongWords, listId)
    const session = await getSession()

    if (!session.userId) {
      return
    }
    const scores = calculateUserScores(wrongWords.length, 'word', false)

    const scoreResult = await updateUserByUserId(session.userId, {
      rating: scores,
      wordLists: 0,
      totalQuizzes: 0,
      successfulQuizzes: 0,
      flashcardsLearned: 0,
      words: wrongWords.length
    })

    if (res.success && scoreResult.success) {
      toast.success(t('modal.successfully_added'), {
        duration: 3000,
        className: 'border text-white-100 border-green-100 bg-green-100'
      })
    } else {
      toast.success(t('modal.error_added'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

  const showAddWordsModal = () => {
    if (session && session.isLoggedIn) {
      setUserListsModal((state) => !state)
      setIsFinished((state) => !state)
    } else {
      console.log('no auth')
      toast.error(t('need_auth'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

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

  const isLoading = isLoadingWordSection || isLoadingUserLists || isSessionLoading

  return (
    <>
      <ConfettiContainer isVisible={isFinished} />
      <Container className={styles.container}>
        {!isLoading && words.length !== 0 && (
          <>
            <div className={styles.top}>
              <H2 className="text-blue-200 font-bold mb-0">
                {t('words_from', { list: locale === 'en' ? wordSection?.sectionTitle : wordSection?.sectionTitleUa })}{' '}
              </H2>
              <NavigationLink
                className={twMerge(styles.link, 'block whitespace-nowrap mt-1.5 dark:text-grey-600')}
                href={`/dashboard/lists/${collectionId}/learn/${sectionId}`}
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
                allowTouchMove={false}
                noSwiping={true}
                simulateTouch={false}
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

        {((!isLoading && words.length === 0) || errorWordSection) && (
          <div className={styles['no-lists']}>
            <P className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_lists')}</P>
            <NavigationLink href="/dashboard/flashcard" className={styles.links}>
              <TbCardsFilled />
              {t('move_flashcards')}
            </NavigationLink>
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
                <H3 className="text-lg text-blue-200 font-bold text-center sm:text-2xl sm:text-start md:text-3xl">
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
                    {wrongWords.length === 0 ? t('no_difficult_words') : t('add_difficult_words')}
                  </P>
                  {wrongWords.length > 0 && (
                    <Button
                      className={twMerge(
                        styles.btn,
                        'dark:!bg-blue-200 dark:!text-grey-600 dark:lg:hover:!bg-purple-100 '
                      )}
                      onClick={() => showAddWordsModal()}
                    >
                      <FaPlus size={20} />
                    </Button>
                  )}
                </div>
                <ul>
                  {wrongWords
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .map((word, i) => (
                      <li key={i} className="mb-2 dark:!bg-[#16274A] dark:text-grey-600">
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

      {userListsModal && (
        <Modal isOpen={userListsModal} className="dark:bg-[#0B152E]" handleClose={() => setUserListsModal(false)}>
          <div className={styles['list-modal']}>
            <div>
              <H3 className="text-2xl font-bold mb-5">{t('modal.choose_list')}</H3>
              <div className={styles.list}>
                {userLists?.map((list) => (
                  <div key={list._id} onClick={() => addWordsToList(list._id)}>
                    <CustomList title={list.title} image={list.image} />
                  </div>
                ))}
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

      <SnackBar />
    </>
  )
}
