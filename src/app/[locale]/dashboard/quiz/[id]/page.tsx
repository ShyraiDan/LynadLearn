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

// TODO
// add loader and message when no quiz found
// isFinished modal not working

export default function SingleQuizPage() {
  const [isQuiz, setIsQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const t = useTranslations('dashboard.quiz')
  const [quiz, setQuiz] = useState<IQuiz | null>(null)

  useEffect(() => {
    getSingleQuiz('Adjectives and prepositions').then((quiz: any) => {
      setQuiz(quiz)
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

  if (!quiz) {
    return <div>We don&apos;t have such quiz</div>
  }
  return (
    <>
      {!isQuiz && (
        <div className={styles.container}>
          <h1>{quiz.title}</h1>
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
                length: quiz.questions.length,
                time: Math.floor((finishTime - startTime) / 1000)
              })}
            </h3>

            <Button onClick={() => returnToQuiz()}>{t('back')}</Button>
          </div>
        </Modal>
      )}
    </>
  )
}
