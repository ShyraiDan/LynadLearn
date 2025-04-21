'use client'

import { CollectionCard } from '@/components/CollectionCard/CollectionCard'
import Loader from '@/components/Loader/Loader'
import PageHeading from '@/components/PageHeading/PageHeading'
import { ICollections } from '@/interfaces/Collections.interface'
import { useEffect, useMemo, useState } from 'react'
import styles from './CollectionsPage.module.scss'
import Container from '@/components/ui/Container/Container'
import { getSession, ISession } from '@/lib/auth'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { ICollectionsGroup } from '@/interfaces/CollectionGroups.interface'

interface ICollectionsPageProps {
  params: {
    locale: string
    name: string
  }
}

export default function QuizCollectionsWrapperPage({ params }: ICollectionsPageProps) {
  const { locale, name } = params
  const [session, setSession] = useState<ISession>()
  const [isSessionLoading, setSessionLoading] = useState(true)

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })

    setSessionLoading(false)
  }, [])

  const { data: collectionGroup, isLoading: isCollectionGroupLoading } = useSWR<ICollectionsGroup>(
    `/api/collectionGroup/${name}?activityType=quiz`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false
    }
  )

  const isLoading = isSessionLoading || isCollectionGroupLoading

  const sessionData = useMemo(() => {
    return {
      avatarUrl: session?.avatarUrl ?? '',
      description: session?.description ?? '',
      email: session?.email ?? '',
      flashcardsLearned: session?.flashcardsLearned ?? 0,
      isLoggedIn: session?.isLoggedIn ?? false,
      location: session?.location ?? '',
      rating: session?.rating ?? 0,
      successfulQuizzes: session?.successfulQuizzes ?? 0,
      totalQuizzes: session?.totalQuizzes ?? 0,
      userId: session?.userId ?? '',
      userName: session?.userName ?? '',
      wordLists: session?.wordLists ?? 0,
      words: session?.words ?? 0
    }
  }, [session])

  return (
    <>
      <Container className={styles.container}>
        {isLoading && <Loader dimensionClass={styles.loader} />}

        {collectionGroup && (
          <>
            <PageHeading
              title={locale === 'en' ? collectionGroup.title : collectionGroup.titleUa}
              description={locale === 'en' ? collectionGroup.description : collectionGroup.descriptionUa}
              showStatistics={false}
            />
            <div className={styles.lists}>
              {collectionGroup.collections.map((item: ICollections) => {
                return (
                  <CollectionCard
                    key={item._id}
                    item={item}
                    locale={locale}
                    redirectLink={`/dashboard/quiz/list/${item._id}`}
                    session={sessionData}
                  />
                )
              })}
            </div>
          </>
        )}
      </Container>

      <SnackBar />
    </>
  )
}
