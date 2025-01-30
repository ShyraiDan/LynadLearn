import styles from './CollectionsPage.module.scss'
import PageHeading from '@/components/PageHeading/PageHeading'
import { ICollections } from '@/interfaces/Collections.interface'
import { CollectionCard } from '@/components/CollectionCard/CollectionCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { DCollectionGroup } from '@/mock/Collections.mock'

interface ICollectionsProps {
  params: {
    locale: string
  }
}

interface ICollectionsPageProps {
  params: {
    locale: string
  }
}

async function Collections({ params }: ICollectionsProps) {
  const { locale } = params

  return (
    <>
      <PageHeading
        name="Collections1"
        id="collections"
        title={locale === 'en' ? DCollectionGroup.title : DCollectionGroup.titleUa}
        description={locale === 'en' ? DCollectionGroup.description : DCollectionGroup.descriptionUa}
        showStatistics={false}
      />
      <div className={styles.lists}>
        {DCollectionGroup.collections.map((item: ICollections) => {
          return <CollectionCard key={item.id} item={item} locale={locale} />
        })}
      </div>
    </>
  )
}

export default function CollectionsPage({ params }: ICollectionsPageProps) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Collections params={params} />
      </Suspense>
    </div>
  )
}
