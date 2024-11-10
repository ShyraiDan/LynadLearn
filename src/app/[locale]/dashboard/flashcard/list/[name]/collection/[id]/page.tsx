'use client'

import styles from './Flashcard.module.scss'
import { addMultipleWords, getWordsByListId } from '@/lib/word'
import { getListById, getYourLists } from '@/lib/lists'
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
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import CustomList from '@/components/CustomList/CustomList'
import { getSession, ISession } from '@/lib/auth'
import { toast } from 'sonner'

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
  const [userLists, setUserLists] = useState<IList[]>([])
  const [userListsModal, setUserListsModal] = useState(false)
  const [session, setSession] = useState<ISession>()
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

    getYourLists().then((lists) => {
      setUserLists(lists)
    })

    getSession().then((data) => {
      setSession(data)
    })

    setLoading(false)
  }, [listId])

  // TODO add end point to add multiple words to the list
  // list of words -> wrongWords
  const addWordsToList = async (listId: string) => {
    console.log('addWordToList')

    await addMultipleWords(wrongWords, listId).then((res) => {
      if (res.success) {
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
    })
  }

  const showAddWordsModal = () => {
    // console.log('click')

    if (session && session.isLoggedIn) {
      // console.log('auth')
      setUserListsModal((state) => !state)
      setIsFinished((state) => !state)
      // removeScrollBar(open)
    } else {
      console.log('no auth')
      toast.error(t('need_auth'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

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
            <p className='dark:!text-grey-600'>{t('no_lists')}</p>
            <NavigationLink href={'/dashboard/flashcard'} className={styles.links}>
              <TbCardsFilled />
              {t('move_flashcards')}
            </NavigationLink>
          </div>
        )}

        {!loading && list && words.length === 0 && (
          <div className={styles['no-lists']}>
            <p className='dark:!text-grey-600'>{t('no_words')}</p>
            <div className='flex gap-4'>
              <NavigationLink href={'/dashboard/flashcard'} className={styles.links}>
                <TbCardsFilled />
                {t('move_flashcards')}
              </NavigationLink>
              <NavigationLink
                href={`/dashboard/vocabulary/${listId}?sort=newest`}
                className={twMerge(styles.links, 'min-w-[188px]')}>
                <TbVocabulary />
                {t('move_list')}
              </NavigationLink>
            </div>
          </div>
        )}

        {loading && <Loader dimensionClass={styles.loader} />}
      </div>

      {isFinished && (
        <Modal
          className={twMerge(styles.finished, 'dark:bg-[#0B152E]')}
          isOpen={isFinished}
          handleClose={() => showModal()}>
          <div className={styles.modal}>
            <div>
              <div className={styles.top}>
                <h3 className='dark:!text-grey-600'>{t('congrats')}</h3>
                <p className='dark:text-grey-600'>
                  {t('you_learned', {
                    words: initialWords
                  })}
                </p>
              </div>
              <div className={twMerge(styles['new-words'], 'dark:!bg-[#1D2D4D]')}>
                <div className={styles.info}>
                  <p className='dark:text-grey-600'>
                    {wrongWords.length === 0 ? t('no_difficult_words') : t('add_difficult_words')}
                  </p>
                  {wrongWords.length > 0 && (
                    <Button
                      className={twMerge(
                        styles.btn,
                        'dark:!bg-blue-200 dark:!text-grey-600 dark:hover:!bg-purple-100 '
                      )}
                      onClick={() => showAddWordsModal()}>
                      <FaPlus size={20} />
                    </Button>
                  )}
                </div>
                <ul>
                  {wrongWords
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .map((word, i) => (
                      <li key={i} className='mb-2 dark:!bg-[#16274A] dark:text-grey-600'>
                        {word.word}
                      </li>
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

      {userListsModal && (
        <Modal isOpen={userListsModal} className='dark:bg-[#0B152E]' handleClose={() => setUserListsModal(false)}>
          <div className={styles['list-modal']}>
            <div>
              <h3 className={twMerge(styles.title, 'dark:text-grey-600')}>{t('modal.choose_list')}</h3>
              <div className={styles.list}>
                {userLists.map((list) => (
                  <div key={list._id} onClick={() => addWordsToList(list._id)}>
                    <CustomList title={list.title} image={list.image} />
                  </div>
                ))}
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

      <SnackBar />
    </>
  )
}
