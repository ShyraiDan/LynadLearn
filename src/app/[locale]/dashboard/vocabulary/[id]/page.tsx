import VocabularyPage from '@/components/VocabularyPage/VocabularyPage'

export default function SingleListPage({ params, searchParams }: { params: any; searchParams: any }) {
  return <VocabularyPage listId={params.id} sorting={searchParams.sort} />
}
