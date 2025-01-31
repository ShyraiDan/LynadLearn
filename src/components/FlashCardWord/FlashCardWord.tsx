'use client'

import styles from './FlashCardWord.module.scss'
import { IWord } from '@/interfaces/Word.interface'
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSwiper } from 'swiper/react'
import { twMerge } from 'tailwind-merge'
import { H3, H6, P } from '@/components/ui/Typography/Typography'

import usFlag from '@/assets/icons/us.svg'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import uaFlag from '@/assets/icons/uk.png'
import { IoReturnUpForward } from 'react-icons/io5'
import { MessageQuestion } from '@/components/ui/Icons/Icons'

type TFlashCardWord = {
  word: IWord
  isActive: boolean
  isLast: boolean
  setWords: React.Dispatch<React.SetStateAction<IWord[]>>
  setWrongWords: React.Dispatch<React.SetStateAction<IWord[]>>
  setFinished: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FlashCardWord({
  word,
  isActive,
  isLast,
  setWords,
  setFinished,
  setWrongWords
}: TFlashCardWord) {
  const [isRotate, setRotate] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const t = useTranslations('dashboard.flashcard')
  const swiper = useSwiper()

  const handleRotate = () => {
    if (!isActive) return
    setRotate((state) => !state)
  }

  const handleCorrect = () => {
    if (isLast) {
      setFinished(true)
    }

    swiper.slideNext()
  }

  const handleIncorrect = () => {
    setWrongWords((state) => [...state, word])
    setWords((state: IWord[]) => [...state, word])
    setIsUpdated(true)
  }

  useEffect(() => {
    if (isUpdated) {
      swiper.slideNext()
      setIsUpdated(false)
    }
  }, [isUpdated, swiper])

  useEffect(() => {
    setRotate(false)
  }, [isActive])

  return (
    <>
      <div className={`${styles.card} ${styles.center} ${isRotate ? styles.active : ''}`}>
        <div className={twMerge(styles.front, 'dark:bg-[#18223D]')}>
          <div className={styles['word-info']}>
            <div className={styles.info}>
              <H3 className="text-lg font-bold mb-0 sm:text-2xl">{word.word}</H3>
              <H6 className="text-base mb-0 sm:text-lg font-medium">{word.results[0]?.part_of_speech}</H6>
            </div>
            <div className={styles.pronunciation}>
              <Image src={usFlag} alt="flag" width={24} />
              <P>{word.pronunciation}</P>
            </div>
          </div>
          <Button className={styles.footer} onClick={() => handleRotate()}>
            <H6 className="text-white-100 font-medium leading-none m-0 flex items-center gap-2">
              <RiArrowGoBackFill />
              {t('show_definition')}
            </H6>
          </Button>
        </div>
        <div className={twMerge(styles.back, 'dark:bg-[#18223D]')}>
          <Button className={styles['back-btn']} onClick={() => handleRotate()}>
            <IoReturnUpForward size={24} />
          </Button>
          <div className={styles['word-info']}>
            <div>
              <div className={styles.translation}>
                <Image src={uaFlag} alt="flag" width={24} />
                <P className="font-medium leading-6 line-clamp-2 cursor-vertical-text text-ellipsis overflow-hidden break-words m-0 text-base sm:text-lg sm:leading-7 lg:text-xl lg:leading-8">
                  {word.translation.ua.join(', ')}
                </P>
              </div>
              <P className="px-4 font-medium text-left text-sm sm:text-base">{word.results[0]?.definition}</P>
            </div>
            {word.results[0]?.examples.length > 0 && (
              <div className={twMerge(styles.examples, 'dark:bg-[#1D2D4D]')}>
                <div className={styles.top}>
                  <div>
                    <MessageQuestion className="dark:fill-grey-600" />
                    <H3 className="m-0 text-base font-medium sm:text-lg">{t('examples')}</H3>
                  </div>
                </div>
                <ul className={styles['example-list']}>
                  {word.results[0]?.examples.map((item: string) => (
                    <li key={item} className="dark:text-grey-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.footer}>
            <Button className={styles['btn-left']} onClick={() => handleIncorrect()}>
              <H6 className="flex items-center gap-1 mb-0 !text-[#BD2927] dark!text-[#BD2927]">
                <RxCross2 fill="#CE302D" />
                {t('incorrect')}
              </H6>
            </Button>
            <Button className={styles['btn-right']} onClick={() => handleCorrect()}>
              <H6 className="flex items-center gap-1 mb-0 !text-[#104132] dark!text-[#104132]">
                <TiTick fill="#2ABFA5" />
                {t('correct')}
              </H6>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
