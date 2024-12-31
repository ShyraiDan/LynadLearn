import styles from './BookmarksPage.module.scss'
import { BookmarkCard } from '@/components/BookmarkCard/BookmarkCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { DBookmarks } from '@/mock/Bookmarks.mock'

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
          <h2 className='dark:text-grey-600'>{t('bookmarks')}</h2>
          <div className={styles.bookmarks}>
            {DBookmarks.map((item) => (
              <BookmarkCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </>
      )}

      {!DBookmarks.length && (
        <div className={styles['no-bookmarks']}>
          <h3 className='dark:text-grey-600'>{t('no_bookmarks')}</h3>
          <p className='dark:text-grey-600'>{t('no_bookmarks_description')}</p>
          <div className={styles.links}>
            <NavigationLink href='/dashboard/grammar'>{t('grammar')}</NavigationLink>
            <NavigationLink href='/dashboard/lists'>{t('vocabulary')}</NavigationLink>
          </div>
        </div>
      )}
    </>
  )
}

export default function BookmarksPage({ params }: IBookmarksPageProps) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Bookmarks params={params} />
      </Suspense>
    </div>
  )
}
