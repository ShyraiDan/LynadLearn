import styles from './BookmarksPage.module.scss'
import { BookmarkCard } from '@/components/BookmarkCard/BookmarkCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'

import list from '@/assets/english-nouns.png'

const bookmarks = [
  {
    id: 'collection-1',
    image: list,
    title: 'Basic Nouns',
    titleUa: 'Основні Іменники',
    description:
      'Here you will find various lists of basic English nouns. They are sorted by different subjects or topics to help you find what you need.',
    descriptionUa:
      'Тут ви знайдете різні списки основних англійських іменників. Вони впорядковані за різними темами, щоб допомогти вам знайти те, що вам потрібно.',
    lessons: 20,
    words: 500
  },
  {
    id: 'collection-2',
    image: list,
    title: 'Basic Nouns',
    titleUa: 'Основні Іменники',
    description:
      'Here you will find various lists of basic English nouns. They are sorted by different subjects or topics to help you find what you need.',
    descriptionUa:
      'Тут ви знайдете різні списки основних англійських іменників. Вони впорядковані за різними темами, щоб допомогти вам знайти те, що вам потрібно.',
    lessons: 20,
    words: 500
  }
]

async function Bookmarks({ params }: any) {
  const t = await getTranslations('dashboard.bookmarks')
  const { locale } = params

  return (
    <>
      {bookmarks.length > 0 && (
        <>
          <h2 className='dark:text-grey-600'>{t('bookmarks')}</h2>
          <div className={styles.bookmarks}>
            {bookmarks.map((item) => (
              <BookmarkCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </>
      )}

      {!bookmarks.length && (
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

export default function BookmarksPage({ params }: any) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Bookmarks params={params} />
      </Suspense>
    </div>
  )
}
