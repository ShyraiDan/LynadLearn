import { CollectionCard } from '@/components/CollectionCard/CollectionCard'
import Loader from '@/components/Loader/Loader'
import PageHeading from '@/components/PageHeading/PageHeading'
import { ICollections } from '@/interfaces/Collections.interface'
import { getCollectionsGroup } from '@/lib/collectionGroup'
import { Suspense } from 'react'
import styles from './CollectionsPage.module.scss'
import Container from '@/components/ui/Container/Container'

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

async function Collections({ params }: ICollectionsProps) {
  const { locale, name } = params

  const collectionGroup = await getCollectionsGroup(name)

  return (
    <>
      <PageHeading
        name="Collections1"
        id="collections"
        title={locale === 'en' ? collectionGroup.title : collectionGroup.titleUa}
        description={locale === 'en' ? collectionGroup.description : collectionGroup.descriptionUa}
        showStatistics={false}
      />
      <div className={styles.lists}>
        {collectionGroup.collections.map((item: ICollections) => {
          return (
            <CollectionCard key={item._id} item={item} locale={locale} redirectLink={`/dashboard/lists/${item._id}`} />
          )
        })}
      </div>
    </>
  )
}

export default function CollectionsPage({ params }: ICollectionsPageProps) {
  return (
    <Container className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Collections params={params} />
      </Suspense>
    </Container>
  )
}
