'use client'

import styles from './GrammerQuiz.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'

import { FaArrowRight } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

export default function GrammarQuiz({ quiz, setCorrect, setQuiz, setIsFinished, setFinishTime }: any) {
  const [seconds, setSeconds] = useState(60)
  const [question, setQuestion] = useState(0)
  const t = useTranslations('dashboard.quiz')
  const [selectedOption, setSelectedOption] = useState(false)

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timerId)
    } else {
      setFinishTime(Date.now())
      setIsFinished((state: boolean) => !state)
    }
  }, [seconds])

  const changeQuestion = (correct: boolean) => {
    if (correct) {
      toast.success(t('correct'), { duration: 1500, className: styles.correct })
      setCorrect((state: number) => state + 1)
    } else {
      toast.error(t('incorrect'), { duration: 1500, className: styles.wrong })
    }
    if (quiz.questions.length - 1 > question) {
      setQuestion(question + 1)
    }
    if (quiz.questions.length - 1 === question) {
      setCorrect(0)
      setQuiz((state: boolean) => !state)
    }
    clearInterval(seconds)
    setSeconds(60)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2 className={twMerge(styles.title, 'dark:text-grey-600')}>{quiz.title}</h2>
          <div>
            <div className={twMerge(styles.questions, 'dark:text-grey-600')}>0/10</div>
            <div className={twMerge('dark:text-grey-600', seconds < 6 && styles.time)}>
              00:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>
        </div>
        <div className={styles.quiz}>
          <div>
            <h1 className={twMerge(styles['question-title'], 'dark:text-grey-600')}>
              {quiz.questions[question].question}
            </h1>
            <div className={styles.answers}>
              {quiz.questions[question].options.map((item: any, i: number) => {
                return (
                  <>
                    <div className={styles.option} key={item._id}>
                      <Input
                        type='radio'
                        name='option'
                        id={`option-${i}`}
                        onChange={() => setSelectedOption(item.correct)}
                        value={item.option}
                        labelStyles='!mb-0 text-blue-200 sm:text-lg dark:text-grey-600'>
                        {item.option}
                      </Input>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
          <div className={styles.button}>
            <Button className={styles.btn} onClick={() => changeQuestion(selectedOption)}>
              {t('next')} <FaArrowRight />
            </Button>
          </div>
        </div>
      </div>
      <SnackBar />
    </>
  )
}
