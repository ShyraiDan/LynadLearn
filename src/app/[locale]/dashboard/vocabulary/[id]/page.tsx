import VocabularyPage from '@/components/VocabularyPage/VocabularyPage'

type TSingleListPage = {
  params: {
    id: any
  }
  searchParams: {
    sort: any
  }
}

export default function SingleListPage({ params, searchParams }: TSingleListPage) {
  return <VocabularyPage listId={params.id} sorting={searchParams.sort} />
}
