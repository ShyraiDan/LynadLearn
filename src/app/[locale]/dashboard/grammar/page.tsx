'use client'

import styles from './GrammarPageRenamed.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'
import { getAllGrammar } from '@/lib/grammar'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { RequireAuthModal } from '@/components/RequireAuthModal/RequireAuthModal'
import { removeScrollBar } from '@/constants/shared'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { getCookies } from '@/utils/cookies'
import { H2, P } from '@/components/ui/Typography/Typography'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('dashboard.grammar')

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
        <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">A1-A2 grammar</H2>
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
        }}
      >
        <P className="text-center font-bold">{t('need_auth')}</P>
      </RequireAuthModal>

      <AuthModal isModalOpen={isAuthModal} showModal={() => setAuthModal((state) => !state)} />
    </div>
  )
}
