//Todo: Remove style files if it is not used
import TopBar from '@/components/TopBar/TopBar'
import WordsTable from '@/components/WordsTable/WordsTable'
import Container from '@/components/ui/Container/Container'

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
    <Container>
      <TopBar listId={params.id} />
      <WordsTable listId={params.id} sorting={searchParams.sort} />
    </Container>
  )
}
