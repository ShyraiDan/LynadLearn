import TopBar from './components/TopBar/TopBar'
import WordsTable from './components/WordsTable/WordsTable'

import styles from './VocabularyPage.module.scss'
import { getListById } from '@/lib/lists'

export default async function VocabularyPage({ listId }: { listId: string }) {
  const list = await getListById(listId)

  return (
    <div className={styles.container}>
      <TopBar />
      <WordsTable list={list} />
    </div>
  )
}
