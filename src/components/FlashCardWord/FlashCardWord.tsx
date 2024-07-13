'use client'

import styles from './FlashCardWord.module.scss'
import { useState } from 'react'
import { Button } from '../ui/Button/Button'
import { useRef } from 'react'
import SnackBar from '../ui/SnackBar/SnackBar'
import { toast } from 'sonner'
import { IWord } from '@/interfaces/Word.interface'
import { useTranslations } from 'next-intl'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

export default function FlashCardWord({ words }: { words: IWord[] }) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [correct, setCorrect] = useState<IWord[]>([])
  const [incorrect, setIncorrect] = useState<IWord[]>([])
  const t = useTranslations('dashboard.flashcard')

  const inputRef = useRef<HTMLInputElement>(null)

  const word = words[0]
  const checkWord = () => {
    if (inputRef.current?.value === word.word) {
      setCorrect([...correct, word])
      toast.success(t('correct'), { duration: 3000 })
    } else {
      setIncorrect([...incorrect, word])
      toast.error(t('wrong'), { duration: 3000 })
    }
  }

  console.log('correct', correct)
  console.log('incorrect', incorrect)
  return (
    <>
      <div className={styles.container}>
        <div className={styles['hidden-word']}>
          <h2>
            {word.translation}
            {!showTranslation && (
              <FaEye className={styles.icon} onClick={() => setShowTranslation((state) => !state)} />
            )}
            {showTranslation && (
              <FaEyeSlash className={styles.icon} onClick={() => setShowTranslation((state) => !state)} />
            )}
          </h2>
          {word.pronunciation && <h6>[{word.pronunciation}]</h6>}
          {showTranslation && <div className={styles.answer}>{t('answer')}</div>}
        </div>

        <div className={styles.bottom}>
          <input type='text' ref={inputRef} placeholder={t('enter_word')} name='word' id='word' />
          <Button type='button' onClick={() => checkWord()}>
            {t('check')}
          </Button>
        </div>
      </div>
      <SnackBar styleClass={inputRef.current?.value === word.word ? styles.correct : styles.wrong} />
    </>
  )
}
