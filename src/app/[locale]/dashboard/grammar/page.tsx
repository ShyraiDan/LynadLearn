'use client'

import styles from './GrammarPage.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { RequireAuthModal } from '@/components/RequireAuthModal/RequireAuthModal'
import { removeScrollBar } from '@/constants/shared'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { H2, H3, P } from '@/components/ui/Typography/Typography'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/Container/Container'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getSession, ISession } from '@/lib/auth'

interface IGrammarPageProps {
  params: {
    locale: string
  }
}

export default function GrammarPage({ params }: IGrammarPageProps) {
  const [isAuthRequireModal, setAuthRequireModal] = useState(false)
  const [isAuthModal, setAuthModal] = useState(false)
  const t = useTranslations('dashboard.grammar')
  const [session, setSession] = useState<ISession>()

  const {
    data: grammarElementary,
    isLoading,
    error
  } = useSWR<IGrammarTopic[]>('/api/grammar', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const handleClose = () => {
    setAuthRequireModal(false)
    removeScrollBar(isAuthRequireModal)
  }

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })
  }, [])

  return (
    <Container className={styles.container}>
      {isLoading && <Loader dimensionClass={styles.loader} />}

      {error && (
        <div className="flex items-center justify-center flex-col h-[calc(100vh-201px-73px-32px)] sm:min-h-[calc(100vh-193px-81px-32px)] md:min-h-[calc(100vh-153px-81px-32px)] lg:h-full">
          <H3 className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_data')}</H3>
          <NavigationLink
            className="flex font-medium items-center justify-center bg-blue-200 text-white-100 px-3 py-1.5 rounded transition-all ease-in-out duration-300 lg:hover:bg-purple-100"
            href="/dashboard/lists"
          >
            {t('to_lists')}
          </NavigationLink>
        </div>
      )}
      {grammarElementary && (
        <>
          <div className={styles.level}>
            <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">A1-A2 grammar</H2>
            <div className={styles.topics}>
              {grammarElementary?.map((item: IGrammarTopic, i: number) => {
                return (
                  <div key={item._id.toString()} className={`${styles.item}  ${styles[`item-${(i % 8) + 1}`]}`}>
                    <QuizCard topic={item} lang={params.locale} session={session} type="grammar" />
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
        </>
      )}
    </Container>
  )
}
