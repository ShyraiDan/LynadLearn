import styles from './Flashcard.module.scss'
import { getYourLists } from '@/lib/lists'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import CustomList from '@/components/CustomList/CustomList'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { DCategories } from '@/mock/Categories.mock'
import { getTranslations } from 'next-intl/server'
import List from '@/components/List/List'
import { H2, H4 } from '@/components/ui/Typography/Typography'

async function YourLists() {
  const lists = await getYourLists()
  const t = await getTranslations()
  return (
    <>
      <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl">
        {t('dashboard.flashcard.flashcard_page')}
      </H2>
      <div className={styles.sections}>
        <div className={styles.top}>
          <H4 className="font-bold text-[1rem] mb-0">{t('dashboard.flashcard.choose_word_list')}</H4>
        </div>
        <div className={styles.items}>
          {lists.map((item) => (
            <div key={item._id} className={styles.item}>
              <NavigationLink href={`/dashboard/flashcard/${item._id}`}>
                <CustomList title={item.title} image={item.image} />
              </NavigationLink>
            </div>
          ))}
        </div>
        {DCategories.map((item) => (
          <>
            <div className={styles.top}>
              <H4 className="font-bold text-[1rem] mb-0">{t(`dashboard.lists.${item.title}`)}</H4>
            </div>
            <div className={styles.items}>
              {item.lists.map((list) => (
                <div key={list._id} className={styles.item}>
                  <List title={list.title} image={list.image} href={`/dashboard/flashcard/list/${list._id}`} />
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default function FlashcardPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <YourLists />
      </Suspense>
    </div>
  )
}
