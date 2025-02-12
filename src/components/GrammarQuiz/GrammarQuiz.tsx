'use client'

import styles from './GrammarQuiz.module.scss'
import Button from '@/components/ui/Button/Button'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'
import { FaArrowRight } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { H1, H2 } from '../ui/Typography/Typography'

interface IGrammarQuizProps {
  quiz: IGrammarTopic
  setCorrect: Dispatch<SetStateAction<number>>
  setIsTimeExpired: Dispatch<SetStateAction<boolean>>
  setFinishTime: Dispatch<SetStateAction<number>>
  setIsFinished: Dispatch<SetStateAction<boolean>>
}

interface IOption {
  _id?: string
  option: string
  correct: boolean
}

export default function GrammarQuiz({
  quiz,
  setCorrect,
  setIsTimeExpired,
  setFinishTime,
  setIsFinished
}: IGrammarQuizProps) {
  const [seconds, setSeconds] = useState(60)
  const [question, setQuestion] = useState(0)
  const t = useTranslations('dashboard.quiz')
  const [selectedOption, setSelectedOption] = useState(false)
  const [isTimer, setIsTimer] = useState(true)

  useEffect(() => {
    if (!isTimer) return

    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timerId)
    } else {
      setFinishTime(Date.now())
      setIsTimeExpired((state: boolean) => !state)
    }
  }, [isTimer, seconds, setFinishTime, setIsTimeExpired])

  const changeQuestion = (correct: boolean) => {
    if (correct) {
      toast.success(t('correct'), { duration: 1500, className: styles.correct })
      setCorrect((state: number) => state + 1)
    } else {
      toast.error(t('incorrect'), { duration: 1500, className: styles.wrong })
    }
    if (quiz.questions.length - 1 > question) {
      setQuestion(question + 1)
      clearInterval(seconds)
      setSeconds(60)
    }
    if (quiz.questions.length - 1 === question) {
      setIsTimer(false)
      setFinishTime(Date.now())
      setIsFinished(true)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <H2 className="text-blue-200 font-bold mb-4">{quiz.title}</H2>
          <div>
            <div className={twMerge(styles.questions, 'dark:text-grey-600')}>0/10</div>
            <div className={twMerge('dark:text-grey-600', seconds < 6 && styles.time)}>
              00:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>
        </div>
        <div className={styles.quiz}>
          <div>
            <H1 className="text-base font-bold text-blue-200 mb-2 sm:text-3xl">{quiz.questions[question].question}</H1>
            <div className={styles.answers}>
              {quiz.questions[question].options.map((item: IOption, i: number) => {
                return (
                  <>
                    <div className={styles.option} key={`${item._id}-${i}`}>
                      <Input
                        type="radio"
                        name="option"
                        id={`option-${i}`}
                        onChange={() => setSelectedOption(item.correct)}
                        value={item.option}
                        labelStyles="!mb-0 text-blue-200 sm:text-lg dark:text-grey-600"
                      >
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
