'use client'

import styles from './BookmarksPage.module.scss'
import { BookmarkCard } from '@/components/BookmarkCard/BookmarkCard'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader/Loader'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { H2, H3, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'
import { getSession } from '@/lib/auth'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import useSWR from 'swr'
import { useTranslations } from 'next-intl'
import { ISession } from '@/lib/auth'
import { fetcher } from '@/utils/fetcher'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'

interface IBookmarksPageProps {
  params: {
    locale: string
  }
}

export default function BookmarksPage({ params }: IBookmarksPageProps) {
  const t = useTranslations('dashboard.bookmarks')
  const { locale } = params
  const [session, setSession] = useState<ISession>()
  const [isSessionLoading, setSessionLoading] = useState(true)

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })

    setSessionLoading(false)
  }, [])

  const {
    data: bookmarks,
    isLoading: isBookmarksLoading,
    mutate: mutateBookmarks
  } = useSWR<IBookmarks[]>(session?.userId ? `/api/bookmarks/${session?.userId}` : null, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const isLoading = isSessionLoading || isBookmarksLoading

  return (
    <>
      <Container className={styles.container}>
        {isLoading && <Loader dimensionClass={styles.loader} />}

        {bookmarks && bookmarks?.length > 0 && (
          <>
            <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">{t('bookmarks')}</H2>
            <div className={styles.bookmarks}>
              {bookmarks.map((item) => (
                <BookmarkCard key={item._id} item={item} locale={locale} onRefresh={mutateBookmarks} />
              ))}
            </div>
          </>
        )}

        {bookmarks && !bookmarks.length && (
          <div className={styles['no-bookmarks']}>
            <H3 className="text-center text-2xl font-bold text-blue-200">{t('no_bookmarks')}</H3>
            <P className="mt-2 text-center text-lg font-bold text-blue-200">{t('no_bookmarks_description')}</P>
            <div className={styles.links}>
              <NavigationLink href="/dashboard/grammar">{t('grammar')}</NavigationLink>
              <NavigationLink href="/dashboard/lists">{t('vocabulary')}</NavigationLink>
            </div>
          </div>
        )}
      </Container>
      <SnackBar />
    </>
  )
}
