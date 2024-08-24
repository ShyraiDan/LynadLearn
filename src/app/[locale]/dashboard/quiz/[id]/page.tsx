'use client'

import styles from './SingleQuiz.module.scss'
import { Button } from '@/components/ui/Button/Button'
import Quiz from '@/components/Quiz/Quiz'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'
import { getSingleQuiz } from '@/lib/quiz'
import { IQuiz } from '@/interfaces/Quiz.interface'
import Loader from '@/components/Loader/Loader'
import { useParams } from 'next/navigation'

// TODO
// isFinished modal not working (after answering the last question)

export default function SingleQuizPage() {
  const [isQuiz, setIsQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [loading, isLoading] = useState(true)
  const t = useTranslations('dashboard.quiz')
  const [quiz, setQuiz] = useState<IQuiz | null>(null)
  const { id } = useParams()

  useEffect(() => {
    getSingleQuiz(id as string).then((quiz: IQuiz | null) => {
      setQuiz(quiz)
      isLoading(false)
    })
  }, [])

  const showModal = () => {
    setIsFinished((state) => !state)
    setIsQuiz((state) => !state)
  }

  const returnToQuiz = () => {
    setIsQuiz(false)
    setIsFinished(false)
  }

  const startQuiz = () => {
    setIsQuiz(true)
    setStartTime(Date.now())
  }

  console.log(correct)

  return (
    <>
      {quiz && !isQuiz && (
        <div className={styles.container}>
          <h1>{quiz?.title}</h1>
          <div>
            <NavigationLink href={'/dashboard/quiz?type=grammar'}>{t('to_quiz')}</NavigationLink>
            <Button onClick={() => startQuiz()}>{t('start_quiz')}</Button>
          </div>
        </div>
      )}

      {isQuiz && (
        <Quiz
          quiz={quiz}
          setCorrect={setCorrect}
          setQuiz={setIsQuiz}
          setTimer={setTimer}
          timer={timer}
          setIsFinished={setIsFinished}
          setFinishTime={setFinishTime}
        />
      )}

      {isFinished && (
        <Modal className={styles['no-time-modal']} isOpen={isFinished} handleClose={() => showModal()}>
          <div className={styles.modal}>
            <h3>
              {t('no_time')}
              <br /> {t('no_question')}
              <br />
              {t('you_got', {
                correct: correct,
                length: quiz?.questions.length,
                time: Math.floor((finishTime - startTime) / 1000)
              })}
            </h3>
            <div className={styles['nav-btns']}>
              <Button onClick={() => returnToQuiz()}>{t('back')}</Button>
              <NavigationLink className={styles.link} href={'/dashboard/quiz?type=grammar'}>
                {t('go_to_quiz')}
              </NavigationLink>
            </div>
          </div>
        </Modal>
      )}

      {loading && (
        <div className={styles.container}>
          <Loader dimensionClass={styles.loader} />
        </div>
      )}

      {!loading && !quiz && <div className={styles.container}>Quiz not found</div>}
    </>
  )
}
