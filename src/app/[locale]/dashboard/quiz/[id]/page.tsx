'use client'

import styles from './SingleQuiz.module.scss'
import Button from '@/components/ui/Button/Button'
import GrammarQuiz from '@/components/GrammarQuiz/GrammarQuiz'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import Loader from '@/components/Loader/Loader'
import { useParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { ScoresEnum } from '@/lib/scores'
import { H1, H3, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'

export default function SingleQuizPage() {
  const [isQuiz, setIsQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimeExpired, setIsTimeExpired] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)

  const [isFinished, setIsFinished] = useState(false)
  const t = useTranslations('dashboard.quiz')
  const { id } = useParams() as { id: string }

  const {
    data: grammarQuiz,
    isLoading,
    error
  } = useSWR<IGrammarTopic>(`/api/grammar/${id}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

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
      <Container className={styles.container}>
        {error && (
          <div className="flex items-center justify-center flex-col h-[calc(100vh-201px-73px-32px)] sm:min-h-[calc(100vh-193px-81px-32px)] md:min-h-[calc(100vh-153px-81px-32px)] lg:h-full">
            <H3 className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_data')}</H3>
            <NavigationLink
              className="flex font-medium items-center justify-center bg-blue-200 text-white-100 px-3 py-1.5 rounded transition-all ease-in-out duration-300 lg:hover:bg-purple-100"
              href={`/dashboard/grammar/${id}`}
            >
              {t('to_grammar')}
            </NavigationLink>
          </div>
        )}

        {grammarQuiz && !isQuiz && (
          <>
            <H1 className="text-2xl text-blue-200 font-bold mb-4">{grammarQuiz?.title}</H1>
            <div>
              <Button className="dark:border-none" onClick={() => startQuiz()}>
                {t('start_quiz')}
              </Button>
              <NavigationLink href="/dashboard/quiz">{t('to_quiz')}</NavigationLink>
            </div>
          </>
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
          handleClose={() => showModal()}
          timeoutModal
        >
          <div className={styles.modal}>
            <H3>
              {t('no_time')}
              <br /> {t('no_question')}
              <br />
              {t('you_got', {
                correct: correct,
                length: grammarQuiz?.questions.length,
                time: Math.floor((finishTime - startTime) / 1000)
              })}
            </H3>
            <div className={styles['nav-btns']}>
              <NavigationLink className={styles.link} href="/dashboard/quiz?type=grammar">
                {t('go_to_quiz')}
              </NavigationLink>
              <Button
                className="w-[135px] !bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 lg:hover:border-red lg:hover:!text-red dark:lg:hover:!border-red dark:lg:hover:!text-red"
                onClick={() => returnToQuiz()}
              >
                {t('back')}
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          className={twMerge(styles['no-time-modal'], 'dark:bg-[#0B152E]')}
          isOpen={isFinished}
          handleClose={() => returnToQuiz()}
          successModal
        >
          <div className={styles.modal}>
            <H3 className="text-xl text-center font-bold text-blue-200 mb-3">{t('finished_quiz')}</H3>
            <P>
              {t('result_quiz', {
                correct: correct,
                length: grammarQuiz?.questions.length,
                time: Math.floor((finishTime - startTime) / 1000),
                points: ScoresEnum.FINISH_QUIZ + correct * ScoresEnum.ANSWER_QUIZ
              })}
            </P>
            <div className={twMerge(styles['nav-btns'], 'mt-3')}>
              <NavigationLink className={styles.link} href="/dashboard/quiz?type=grammar">
                {t('go_to_quiz')}
              </NavigationLink>
              <Button
                className="w-[135px] !bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 lg:hover:border-red lg:hover:!text-red dark:lg:hover:!border-red dark:lg:hover:!text-red"
                onClick={() => returnToQuiz()}
              >
                {t('back')}
              </Button>
            </div>
          </div>
        </Modal>

        {isLoading && <Loader dimensionClass={styles.loader} />}

        {!isLoading && !grammarQuiz && (
          <>
            <H3 className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_quiz')}</H3>
            <NavigationLink href="/dashboard/quiz?type=grammar">{t('move_to_quizzes')}</NavigationLink>
          </>
        )}
      </Container>
    </>
  )
}
