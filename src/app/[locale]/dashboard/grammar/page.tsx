'use client'

import styles from './GrammarPageRenamed.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'
import { getAllGrammar } from '@/lib/grammar'
import { twMerge } from 'tailwind-merge'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { RequireAuthModal } from '@/components/RequireAuthModal/RequireAuthModal'
import { removeScrollBar } from '@/constants/shared'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { getCookies } from '@/utils/cookies'

interface IGrammarPageProps {
  params: {
    locale: string
  }
}

export default function GrammarPage({ params }: IGrammarPageProps) {
  const [grammarElementary, setGrammarElementary] = useState<IGrammarTopic[]>([])
  const [isAuthRequireModal, setAuthRequireModal] = useState(false)
  const [isAuthModal, setAuthModal] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getAllGrammar('A1-A2').then((res) => {
      setGrammarElementary(res)
      setLoading(false)
    })
  }, [])

  const handleClose = () => {
    setAuthRequireModal(false)
    removeScrollBar(isAuthRequireModal)
  }

  const handleBookmark = (id: string) => {
    const cookies = getCookies()

    if (cookies['lama-session']) {
      return true
    } else {
      setAuthRequireModal(true)
      removeScrollBar(isAuthRequireModal)
    }

    return false
  }

  if (isLoading)
    return (
      <div className={styles.container}>
        <Loader dimensionClass={styles.loader} />
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={styles.level}>
        <h2 className={twMerge(styles.title, 'dark:text-grey-600')}>A1-A2 grammar</h2>
        <div className={styles.topics}>
          {grammarElementary.map((item: IGrammarTopic, i) => {
            return (
              <div key={item._id.toString()} className={`${styles.item}  ${styles[`item-${(i % 8) + 1}`]}`}>
                <QuizCard topic={item} lang={params.locale} allowedAction={handleBookmark} />
              </div>
            )
          })}
        </div>
      </div>

      <RequireAuthModal
        isOpen={isAuthRequireModal}
        handleClose={handleClose}
        allowedAction={() => {
          setAuthModal(true)
          handleClose()
        }}>
        <p className='text-center font-bold'>In order to add to your bookmarks you must sign in to your account</p>
      </RequireAuthModal>

      <AuthModal isModalOpen={isAuthModal} showModal={() => setAuthModal((state) => !state)} />
    </div>
  )
}
