'use client'

import styles from './SingleQuiz.module.scss'
import { Button } from '@/components/ui/Button/Button'
import GrammarQuiz from '@/components/GrammarQuiz/GrammarQuiz'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'
import { getSingleQuiz } from '@/lib/quiz'
import { IQuiz } from '@/interfaces/Quiz.interface'
import Loader from '@/components/Loader/Loader'
import { useParams, useSearchParams } from 'next/navigation'
import { getListById } from '@/lib/lists'
import { getWordsByListId } from '@/lib/word'
import { twMerge } from 'tailwind-merge'
import { IList } from '@/interfaces/List.interface'

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
  const [grammarQuiz, setGrammarQuiz] = useState<IQuiz | null>(null)
  const [vocabularyQuiz, setVocabularyQuiz] = useState<any>(null)
  const { id } = useParams()
  const type = useSearchParams().get('type')

  useEffect(() => {
    if (type === 'grammar') {
      console.log('GRAMMAR')

      getSingleQuiz(id as string).then((quiz: IQuiz | null) => {
        setGrammarQuiz(quiz)
        isLoading(false)
      })
    } else if (type === 'vocabulary') {
      console.log('VOCABULARY')

      Promise.all([getListById(id as string), getWordsByListId(id as string)]).then(([list, words]) =>
        setVocabularyQuiz({
          title: `Vocabulary quiz from the list: ${list?.title}`,
          words
        })
      )
      isLoading(false)
    } else {
      console.log('ELSE')
      isLoading(false)
    }
  }, [])

  console.log('quiz', vocabularyQuiz)

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

  // console.log(correct)

  return (
    <>
      {(grammarQuiz || vocabularyQuiz) && !isQuiz && (
        <div className={styles.container}>
          <h1 className='dark:text-grey-600'>{type === 'grammar' ? grammarQuiz?.title : vocabularyQuiz?.title}</h1>
          <div>
            <NavigationLink href={'/dashboard/quiz?type=grammar'}>{t('to_quiz')}</NavigationLink>
            <Button className='dark:border-none' onClick={() => startQuiz()}>
              {t('start_quiz')}
            </Button>
          </div>
        </div>
      )}

      {type === 'grammar' && isQuiz && (
        <GrammarQuiz
          quiz={grammarQuiz}
          setCorrect={setCorrect}
          setQuiz={setIsQuiz}
          setTimer={setTimer}
          timer={timer}
          setIsFinished={setIsFinished}
          setFinishTime={setFinishTime}
        />
      )}

      {type === 'vocabulary' && isQuiz && <div>Vocab quiz</div>}

      {isFinished && (
        <Modal
          className={twMerge(styles['no-time-modal'], 'dark:bg-[#0B152E]')}
          isOpen={isFinished}
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

      {!loading && !grammarQuiz && !vocabularyQuiz && (
        <div className={styles.container}>
          <h3 className='dark:text-grey-600'>{t('no_quiz')}</h3>
          <NavigationLink href='/dashboard/quiz?type=grammar'>{t('move_to_quizzes')}</NavigationLink>
        </div>
      )}
    </>
  )
}
