'use client'

import styles from './SingleQuiz.module.scss'
import { Button } from '@/components/ui/Button/Button'
import Quiz from '@/components/Quiz/Quiz'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useState } from 'react'
import { DQuiz } from '@/mock/Quiz.mock'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'

type TSingleQuizPage = {
  params: {
    id: any
  }
}

export default function SingleQuizPage({ params }: TSingleQuizPage) {
  const [isQuiz, setQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const t = useTranslations('dashboard.quiz')

  const showModal = () => {
    setIsFinished((state) => !state)
    setQuiz((state) => !state)
  }

  const returnToQuiz = () => {
    setQuiz(false)
    setIsFinished(false)
  }

  const startQuiz = () => {
    setQuiz(true)
    setStartTime(Date.now())
  }

  console.log(correct)

  return (
    <>
      {!isQuiz && (
        <div className={styles.container}>
          <h1>{DQuiz.title}</h1>
          <div>
            <NavigationLink href={'/dashboard/quiz?type=grammar'}>{t('to_quiz')}</NavigationLink>
            <Button onClick={() => startQuiz()}>{t('start_quiz')}</Button>
          </div>
        </div>
      )}

      {isQuiz && (
        <Quiz
          quiz={DQuiz}
          setCorrect={setCorrect}
          setQuiz={setQuiz}
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
                length: DQuiz.questions.length,
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
