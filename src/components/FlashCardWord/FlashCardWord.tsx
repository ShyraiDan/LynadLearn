'use client'

import styles from './FlashCardWord.module.scss'
import { IWord } from '@/interfaces/Word.interface'
import Image from 'next/image'
import { Button } from '../ui/Button/Button'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import usFlag from '@/assets/icons/us.svg'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import example from '@/assets/icons/message-question.svg'
import uaFlag from '@/assets/icons/uk.png'
import { IoReturnUpForward } from 'react-icons/io5'

export default function FlashCardWord({ word, isActive }: { word: IWord; isActive: boolean }) {
  const [isRotate, setRotate] = useState(false)
  const t = useTranslations('dashboard.flashcard')

  const handleRotate = () => {
    if (!isActive) return
    setRotate((state) => !state)
  }

  useEffect(() => {
    setRotate(false)
  }, [isActive])

  return (
    <>
      <div className={`${styles.card} ${styles.center} ${isRotate ? styles.active : ''}`}>
        <div className={styles.front}>
          <div className={styles['word-info']}>
            <div className={styles.info}>
              <h3 className={styles.word}>{word.word}</h3>
              <h6 className={styles['part-of-speech']}>[{word.part_of_speech}]</h6>
            </div>
            <div className={styles.pronunciation}>
              <Image src={usFlag} alt='flag' width={24} />
              <p>{word.pronunciation}</p>
            </div>
          </div>
          <Button className={styles.footer} onClick={() => handleRotate()}>
            <h6>
              <RiArrowGoBackFill />
              {t('show_definition')}
            </h6>
          </Button>
        </div>
        <div className={styles.back}>
          <Button className={styles['back-btn']} onClick={() => handleRotate()}>
            <IoReturnUpForward size={24} />
          </Button>
          <div className={styles['word-info']}>
            <div>
              <div className={styles.translation}>
                <Image src={uaFlag} alt='flag' width={24} />
                <p>{word.translation}</p>
              </div>
              <p>{word.definition}</p>
            </div>
            <div className={styles.examples}>
              <div className={styles.top}>
                <div>
                  <Image src={example} alt='example' />
                  <h3>{t('examples')}</h3>
                </div>
              </div>
              <ul className={styles['example-list']}>
                {/* Change this for different types of words (from default list, from custom list) */}

                {/* {word.example.map((item: string) => (
                  <li key={item}>{item}</li>
                ))} */}
                <li>{word.example}</li>
              </ul>
            </div>
          </div>
          <div className={styles.footer}>
            <Button className={styles['btn-left']}>
              <h6>
                <RxCross2 fill='#CE302D' />
                {t('incorrect')}
              </h6>
            </Button>
            <Button className={styles['btn-right']}>
              <h6>
                <TiTick fill='#2ABFA5' />
                {t('correct')}
              </h6>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
