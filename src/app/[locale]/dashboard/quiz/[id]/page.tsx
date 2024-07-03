'use client'

import styles from './SingleQuiz.module.scss'
import { Button } from '@/components/ui/Button/Button'
import Quiz from '@/components/Quiz/Quiz'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useState } from 'react'
import { DQuiz } from '@/mock/Quiz.mock'
import { Modal } from '@/components/ui/Modal/Modal'

export default function SingleQuizPage({ params }: any) {
  const [isQuiz, setQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)

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

  return (
    <>
      {!isQuiz && (
        <div className={styles.container}>
          <h1>{DQuiz.title}</h1>
          <div>
            <NavigationLink href={'/dashboard/quiz'}>Go to Quizes</NavigationLink>
            <Button onClick={() => startQuiz()}>Start Quiz</Button>
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
              Час вичерпано!
              <br /> На жаль, час на відповідь на це запитання вікторини минув. <br />
              You scored {correct} out of {DQuiz.questions.length} in {Math.floor((finishTime - startTime) / 1000)}{' '}
              seconds
            </h3>

            <Button onClick={() => returnToQuiz()}>Back</Button>
          </div>
        </Modal>
      )}
    </>
  )
}
