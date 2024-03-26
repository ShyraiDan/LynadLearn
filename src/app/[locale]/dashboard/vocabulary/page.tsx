import WordsTable from '@/components/WordsTable/WordsTable'
import styles from './VocabularyPage.module.scss'

export default function VocabularyPage() {
  return (
    <div className={styles.container}>
      <WordsTable />
    </div>
  )
}
