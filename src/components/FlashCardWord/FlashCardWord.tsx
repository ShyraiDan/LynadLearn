'use client'

import styles from './FlashCardWord.module.scss'
import { IWord } from '@/interfaces/Word.interface'
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSwiper } from 'swiper/react'
import { twMerge } from 'tailwind-merge'

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
              <h3 className={twMerge(styles.word, 'dark:text-grey-600')}>{word.word}</h3>
              <h6 className={twMerge(styles['part-of-speech'], 'dark:text-grey-600')}>
                {word.results[0]?.part_of_speech}
              </h6>
            </div>
            <div className={styles.pronunciation}>
              <Image src={usFlag} alt="flag" width={24} />
              <p className="dark:text-grey-600">{word.pronunciation}</p>
            </div>
          </div>
          <Button className={styles.footer} onClick={() => handleRotate()}>
            <h6>
              <RiArrowGoBackFill />
              {t('show_definition')}
            </h6>
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
                <p className="dark:text-grey-600">{word.translation.ua.join(', ')}</p>
              </div>
              <p className="dark:text-grey-600">{word.results[0]?.definition}</p>
            </div>
            {word.results[0]?.examples.length > 0 && (
              <div className={twMerge(styles.examples, 'dark:bg-[#1D2D4D]')}>
                <div className={styles.top}>
                  <div>
                    <MessageQuestion className="dark:fill-grey-600" />
                    <h3 className="dark:text-grey-600">{t('examples')}</h3>
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
              <h6>
                <RxCross2 fill="#CE302D" />
                {t('incorrect')}
              </h6>
            </Button>
            <Button className={styles['btn-right']} onClick={() => handleCorrect()}>
              <h6>
                <TiTick fill="#2ABFA5" />
                {t('correct')}
              </h6>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
