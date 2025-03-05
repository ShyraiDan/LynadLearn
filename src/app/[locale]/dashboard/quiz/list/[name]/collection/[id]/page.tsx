'use client'

import { useEffect, useState } from 'react'
import styles from './VocabularyQuizPage.module.scss'
// import { getWordsByListId } from '@/lib/word'
import { IWord } from '@/interfaces/Word.interface'
import { DWords } from '@/mock/Words.mock'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import Loader from '@/components/Loader/Loader'
import { twMerge } from 'tailwind-merge'
import Button from '@/components/ui/Button/Button'
import VocabularyQuiz from '@/components/VocabularyQuiz/VocabularyQuiz'
import { getVocabularyQuiz } from '@/lib/quiz'
import { IVocabularyQuiz } from '@/interfaces/Quiz.interface'
import { Modal } from '@/components/ui/Modal/Modal'
import { ScoresEnum } from '@/lib/scores'
import { H1, H3, P } from '@/components/ui/Typography/Typography'

interface IVocabularyQuizPageProps {
  params: {
    id: string
  }
}

export default function VocabularyQuizPage({ params }: IVocabularyQuizPageProps) {
  const [isQuiz, setIsQuiz] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimeExpired, setIsTimeExpired] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finishTime, setFinishTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [loading, isLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const t = useTranslations('dashboard.quiz')
  const { id: listId } = params
  const [words, setWords] = useState<IWord[]>([...DWords])
  const [vocabularyQuiz, setVocabularyQuiz] = useState<IVocabularyQuiz | null>(null)

  // TODO: finish word api and uncomment this
  // useEffect(() => {
  //   getWordsByListId(listId).then((data) => {
  //     setWords(data)
  //     isLoading(false)
  //   })
  // }, [listId])

  useEffect(() => {
    //TODO: listId temporary not used
    if (words) {
      getVocabularyQuiz(words).then((data) => {
        setVocabularyQuiz(data)
      })
    }
  }, [listId, words])

  const startQuiz = () => {
    setIsQuiz(true)
    setStartTime(Date.now())
  }

  const showModal = () => {
    setIsTimeExpired((state) => !state)
    setIsQuiz((state) => !state)
  }

  const returnToQuiz = () => {
    setIsQuiz(false)
    setIsTimeExpired(false)
    setIsFinished(false)
  }

  //TODO here we need to add a point when user finish a quiz
  if (isFinished) {
    const userScore = ScoresEnum.FINISH_QUIZ + correct * ScoresEnum.ANSWER_QUIZ
  }

  return (
    <>
      {words && !isQuiz && (
        <>
          <div className={styles.container}>
            <H1 className="text-2xl text-blue-200 font-bold mb-4">{t('vocabulary_quiz')}</H1>
            <div>
              <Button className="dark:border-none" onClick={() => startQuiz()}>
                {t('start_quiz')}
              </Button>
              <NavigationLink href="/dashboard/quiz">{t('to_quiz')}</NavigationLink>
            </div>
          </div>
        </>
      )}

      {!vocabularyQuiz && (
        <>
          <div>{t('list_empty')}</div>
        </>
      )}

      {isQuiz && vocabularyQuiz && (
        <VocabularyQuiz
          quiz={vocabularyQuiz}
          setCorrect={setCorrect}
          // setQuiz={setIsQuiz}
          // setTimer={setTimer}
          // timer={timer}
          setIsTimeExpired={setIsTimeExpired}
          setIsFinished={setIsFinished}
          setFinishTime={setFinishTime}
        />
      )}

      {loading && (
        <div className={styles.container}>
          <Loader dimensionClass={styles.loader} />
        </div>
      )}

      {!loading && !words && (
        <div className={styles.container}>
          <div className={styles['no-quiz']}>
            <H3 className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_quiz')}</H3>
            <NavigationLink className={styles.link} href="/dashboard/quiz?type=vocabulary">
              {t('move_to_quizzes')}
            </NavigationLink>
          </div>
        </div>
      )}

      <Modal
        className={twMerge(styles['no-time-modal'], 'dark:bg-[#0B152E]')}
        isOpen={isTimeExpired}
        handleClose={() => showModal()}
      >
        <div className={styles.modal}>
          <H3 className="text-xl text-center font-bold text-blue-200 mb-3">
            {t('no_time')}
            <br /> {t('no_question')}
            <br />
            {t('you_got', {
              correct: correct,
              length: vocabularyQuiz?.questions.length,
              time: Math.floor((finishTime - startTime) / 1000)
            })}
          </H3>
          <div className={styles['nav-btns']}>
            <NavigationLink className={styles.link} href="/dashboard/quiz?type=vocabulary">
              {t('go_to_quiz')}
            </NavigationLink>
            <Button
              className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 lg:hover:border-red lg:hover:!text-red dark:lg:hover:!border-red dark:lg:hover:!text-red"
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
      >
        <div className={styles.modal}>
          <H3 className="text-xl text-center font-bold text-blue-200 mb-3">{t('finished_quiz')}</H3>
          <P>
            {t('result_quiz', {
              correct: correct,
              length: vocabularyQuiz?.questions.length,
              time: Math.floor((finishTime - startTime) / 1000),
              points: ScoresEnum.FINISH_QUIZ + correct * ScoresEnum.ANSWER_QUIZ
            })}
          </P>
          <div className={twMerge(styles['nav-btns'], 'mt-3')}>
            <NavigationLink className={styles.link} href="/dashboard/quiz?type=vocabulary">
              {t('go_to_quiz')}
            </NavigationLink>
            <Button
              className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 lg:hover:border-red lg:hover:!text-red dark:lg:hover:!border-red dark:lg:hover:!text-red"
              onClick={() => returnToQuiz()}
            >
              {t('back')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
