import VocabularyPage from '@/components/VocabularyPage/VocabularyPage'

export default function SingleListPage({ params }: { params: { locale: string; id: string } }) {
  return <VocabularyPage listId={params.id} />
}
