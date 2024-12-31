import TopBar from '@/components/TopBar/TopBar'
import WordsTable from '@/components/WordsTable/WordsTable'
import styles from './VocabularyPage.module.scss'

type TSingleListPage = {
  params: {
    id: string
  }
  searchParams: {
    sort: string
  }
}

export default function SingleListPage({ params, searchParams }: TSingleListPage) {
  return (
    <div className={styles.container}>
      <TopBar />
      <WordsTable listId={params.id} sorting={searchParams.sort} />
    </div>
  )
}
