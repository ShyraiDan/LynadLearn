import { CollectionCard } from '@/components/CollectionCard/CollectionCard'
import Loader from '@/components/Loader/Loader'
import PageHeading from '@/components/PageHeading/PageHeading'
import { ICollections } from '@/interfaces/Collections.interface'
import { getCollectionsGroup } from '@/lib/collectionGroup'
import { Suspense } from 'react'
import styles from './CollectionsPage.module.scss'
import Container from '@/components/ui/Container/Container'
import { getSession } from '@/lib/auth'

interface ICollectionsProps {
  params: {
    locale: string
    name: string
  }
}

interface ICollectionsPageProps {
  params: {
    locale: string
    name: string
  }
}

async function QuizCollectionsPage({ params }: ICollectionsProps) {
  const { locale, name } = params

  const session = await getSession()
  const collectionGroup = await getCollectionsGroup(name)

  return (
    <>
      <PageHeading
        title={locale === 'en' ? collectionGroup.title : collectionGroup.titleUa}
        description={locale === 'en' ? collectionGroup.description : collectionGroup.descriptionUa}
        showStatistics={false}
      />
      <div className={styles.lists}>
        {collectionGroup.collections.map((item: ICollections) => {
          return (
            <CollectionCard
              key={item._id}
              item={item}
              locale={locale}
              redirectLink={`/dashboard/flashcard/list/${item._id}`}
              session={session}
            />
          )
        })}
      </div>
    </>
  )
}

export default function QuizCollectionsWrapperPage({ params }: ICollectionsPageProps) {
  return (
    <Container className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <QuizCollectionsPage params={params} />
      </Suspense>
    </Container>
  )
}
