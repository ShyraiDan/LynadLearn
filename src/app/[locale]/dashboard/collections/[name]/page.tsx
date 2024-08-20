import styles from './CollectionsPage.module.scss'
import PageHeading from '@/components/PageHeading/PageHeading'
import { ICollections } from '@/interfaces/Collections.interface'
import { CollectionCard } from '@/components/CollectionCard/CollectionCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'

import list from '@/assets/english-nouns.png'

const collectionGroup = {
  id: 'collection-group-1',
  title: 'title',
  titleUa: 'titleUa',
  description: 'description',
  descriptionUa: 'descriptionUa',
  image: list,
  collections: [
    {
      id: 'collection-1',
      image: list,
      title: 'Basic Nouns',
      titleUa: 'Основні Іменники',
      description:
        'Here you will find various lists of basic English nouns. They are sorted by different subjects or topics to help you find what you need.',
      descriptionUa:
        'Тут ви знайдете різні списки основних англійських іменників. Вони впорядковані за різними темами, щоб допомогти вам знайти те, що вам потрібно.',
      lessons: 20,
      words: 500
    },
    {
      id: 'collection-2',
      image: list,
      title: 'Basic Nouns',
      titleUa: 'Основні Іменники',
      description:
        'Here you will find various lists of basic English nouns. They are sorted by different subjects or topics to help you find what you need.',
      descriptionUa:
        'Тут ви знайдете різні списки основних англійських іменників. Вони впорядковані за різними темами, щоб допомогти вам знайти те, що вам потрібно.',
      lessons: 20,
      words: 500
    }
  ]
}

async function Collections({ params }: any) {
  const { locale } = params

  return (
    <>
      <PageHeading
        name='Collections1'
        id='collections'
        title={locale === 'en' ? collectionGroup.title : collectionGroup.titleUa}
        description={locale === 'en' ? collectionGroup.description : collectionGroup.descriptionUa}
        showStatistics={false}
      />
      <div className={styles.lists}>
        {collectionGroup.collections.map((item: ICollections) => {
          return <CollectionCard key={item.id} item={item} locale={locale} />
        })}
      </div>
    </>
  )
}

export default function CollectionsPage({ params }: any) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Collections params={params} />
      </Suspense>
    </div>
  )
}
