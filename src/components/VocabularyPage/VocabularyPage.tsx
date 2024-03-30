import TopBar from './components/TopBar/TopBar'
import WordsTable from './components/WordsTable/WordsTable'

import styles from './VocabularyPage.module.scss'

export default function VocabularyPage() {
  return (
    <div className={styles.container}>
      <TopBar />
      <WordsTable />
    </div>
  )
}
