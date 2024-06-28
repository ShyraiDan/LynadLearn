import TopBar from './components/TopBar/TopBar'
import WordsTable from './components/WordsTable/WordsTable'

import styles from './VocabularyPage.module.scss'

export default async function VocabularyPage({ listId }: { listId: string }) {
  return (
    <div className={styles.container}>
      <TopBar />
      <WordsTable listId={listId} />
    </div>
  )
}
