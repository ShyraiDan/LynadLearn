import styles from './BookmarksPage.module.scss'
import { BookmarkCard } from '@/components/BookmarkCard/BookmarkCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { DBookmarks } from '@/mock/Bookmarks.mock'
import { H2, H3, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'

interface IBookmarksProps {
  params: {
    locale: string
  }
}

interface IBookmarksPageProps {
  params: {
    locale: string
  }
}

async function Bookmarks({ params }: IBookmarksProps) {
  const t = await getTranslations('dashboard.bookmarks')
  const { locale } = params

  return (
    <>
      {DBookmarks.length > 0 && (
        <>
          <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">{t('bookmarks')}</H2>
          <div className={styles.bookmarks}>
            {DBookmarks.map((item) => (
              <BookmarkCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </>
      )}

      {!DBookmarks.length && (
        <div className={styles['no-bookmarks']}>
          <H3 className="text-center text-2xl font-bold text-blue-200">{t('no_bookmarks')}</H3>
          <P className="mt-2 text-center text-lg font-bold text-blue-200">{t('no_bookmarks_description')}</P>
          <div className={styles.links}>
            <NavigationLink href="/dashboard/grammar">{t('grammar')}</NavigationLink>
            <NavigationLink href="/dashboard/lists">{t('vocabulary')}</NavigationLink>
          </div>
        </div>
      )}
    </>
  )
}

export default function BookmarksPage({ params }: IBookmarksPageProps) {
  return (
    <Container className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Bookmarks params={params} />
      </Suspense>
    </Container>
  )
}
