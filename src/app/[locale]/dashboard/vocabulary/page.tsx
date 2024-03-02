import SideBar from '@/components/SideBar/SideBar'
import WordsTable from '@/components/WordsTable/WordsTable'
import styles from './VocabularyPage.module.scss'

export default function VocabularyPage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <WordsTable />
    </div>
  )
}
