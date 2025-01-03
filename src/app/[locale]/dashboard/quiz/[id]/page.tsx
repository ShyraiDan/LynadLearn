'use client'

import styles from './SingleQuiz.module.scss'
import Button from '@/components/ui/Button/Button'
import GrammarQuiz from '@/components/GrammarQuiz/GrammarQuiz'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'
import { getGrammarQuiz } from '@/lib/quiz'
import { IQuiz } from '@/interfaces/Quiz.interface'
import Loader from '@/components/Loader/Loader'
import { useParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { ScoresEnum } from '@/lib/scores'

export default function SingleQuizPage() {
  const [isQuiz, setIsQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimeExpired, setIsTimeExpired] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [loading, isLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const t = useTranslations('dashboard.quiz')
  const [grammarQuiz, setGrammarQuiz] = useState<IQuiz | null>(null)
  const { id } = useParams()

  useEffect(() => {
    getGrammarQuiz(id as string).then((quiz: IQuiz | null) => {
      setGrammarQuiz(quiz)
      isLoading(false)
    })
  }, [id])

  const showModal = () => {
    setIsTimeExpired((state) => !state)
    setIsQuiz((state) => !state)
  }

  const returnToQuiz = () => {
    setIsQuiz(false)
    setIsTimeExpired(false)
    setIsFinished(false)
  }

  const startQuiz = () => {
    setIsQuiz(true)
    setStartTime(Date.now())
  }

  //TODO here we need to add a point when user finish a quiz
  if (isFinished) {
    const userScore = ScoresEnum.FINISH_QUIZ + correct * ScoresEnum.ANSWER_QUIZ
  }

  return (
    <>
      {grammarQuiz && !isQuiz && (
        <div className={styles.container}>
          <h1 className='dark:text-grey-600'>{grammarQuiz?.title}</h1>
          <div>
            <NavigationLink href='/dashboard/quiz'>{t('to_quiz')}</NavigationLink>
            <Button className='dark:border-none' onClick={() => startQuiz()}>
              {t('start_quiz')}
            </Button>
          </div>
        </div>
      )}

      {isQuiz && grammarQuiz && (
        <GrammarQuiz
          quiz={grammarQuiz}
          setCorrect={setCorrect}
          // setQuiz={setIsQuiz}
          // setTimer={setTimer}
          // timer={timer}
          setIsTimeExpired={setIsTimeExpired}
          setIsFinished={setIsFinished}
          setFinishTime={setFinishTime}
        />
      )}

      <Modal
        className={twMerge(styles['no-time-modal'], 'dark:bg-[#0B152E]')}
        isOpen={isTimeExpired}
        handleClose={() => showModal()}>
        <div className={styles.modal}>
          <h3 className={twMerge(styles['modal-title'], 'dark:text-grey-600')}>
            {t('no_time')}
            <br /> {t('no_question')}
            <br />
            {t('you_got', {
              correct: correct,
              length: grammarQuiz?.questions.length,
              time: Math.floor((finishTime - startTime) / 1000)
            })}
          </h3>
          <div className={styles['nav-btns']}>
            <Button onClick={() => returnToQuiz()}>{t('back')}</Button>
            <NavigationLink className={styles.link} href='/dashboard/quiz?type=grammar'>
              {t('go_to_quiz')}
            </NavigationLink>
          </div>
        </div>
      </Modal>

      <Modal
        className={twMerge(styles['no-time-modal'], 'dark:bg-[#0B152E]')}
        isOpen={isFinished}
        handleClose={() => returnToQuiz()}>
        <div className={styles.modal}>
          <h3 className={twMerge(styles['modal-title'], 'dark:text-grey-600')}>{t('finished_quiz')}</h3>
          <p className='dark:text-grey-600'>
            {t('result_quiz', {
              correct: correct,
              length: grammarQuiz?.questions.length,
              time: Math.floor((finishTime - startTime) / 1000),
              points: ScoresEnum.FINISH_QUIZ + correct * ScoresEnum.ANSWER_QUIZ
            })}
          </p>
          <div className={twMerge(styles['nav-btns'], 'mt-3')}>
            <Button onClick={() => returnToQuiz()}>{t('back')}</Button>
            <NavigationLink className={styles.link} href='/dashboard/quiz?type=grammar'>
              {t('go_to_quiz')}
            </NavigationLink>
          </div>
        </div>
      </Modal>

      {loading && (
        <div className={styles.container}>
          <Loader dimensionClass={styles.loader} />
        </div>
      )}

      {!loading && !grammarQuiz && (
        <div className={styles.container}>
          <h3 className='dark:text-grey-600'>{t('no_quiz')}</h3>
          <NavigationLink href='/dashboard/quiz?type=grammar'>{t('move_to_quizzes')}</NavigationLink>
        </div>
      )}
    </>
  )
}
