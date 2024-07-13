import styles from './Flashcard.module.scss'
import { getWordsByListId } from '@/lib/word'
import { getListById } from '@/lib/lists'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import FlashCardWord from '@/components/FlashCardWord/FlashCardWord'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getTranslations } from 'next-intl/server'

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

async function FlashCards({ listId }: any) {
  const t = await getTranslations('dashboard.flashcard')
  const words = await getWordsByListId(listId)
  const list = await getListById(listId)

  const shuffled = shuffleArray(words)

  return (
    <>
      <div className={styles.top}>
        <h2> {t('words_from', { list: list.title })} </h2>
        <NavigationLink href={`/dashboard/vocabulary/${listId}`}>{t('view_list')}</NavigationLink>
      </div>
      <FlashCardWord words={shuffled} />
    </>
  )
}

export default function SingleFlashcardPage({ params }: any) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <FlashCards listId={params.id} />
      </Suspense>
    </div>
  )
}
