'use client'

import styles from './Quiz.module.scss'
import { Button } from '../ui/Button/Button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import SnackBar from '../ui/SnackBar/SnackBar'
import { useTranslations } from 'next-intl'

export default function Quiz({ quiz, setCorrect, setQuiz, setIsFinished, setFinishTime }: any) {
  const [seconds, setSeconds] = useState(10)
  const [question, setQuestion] = useState(0)
  const t = useTranslations('dashboard.quiz')

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
      toast.success(t('correct'), { duration: 3000, className: styles.correct })
      setCorrect((state: number) => state + 1)
    } else {
      toast.error(t('wrong'), { duration: 3000, className: styles.wrong })
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
          <h2>{quiz.title}</h2>
          <div>
            <div className={styles.questions}>0/10</div>
            <div className={`${seconds < 6 && styles.time}`}>00:{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
        </div>
        <div className={styles.quiz}>
          <h1>{quiz.questions[question].question}</h1>
          <div className={styles.answers}>
            {quiz.questions[question].options.map((item: any) => {
              return (
                <Button key={item.option} onClick={() => changeQuestion(item.correct)}>
                  {item.option}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      <SnackBar />
    </>
  )
}
