import styles from './GrammarPage.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getAllGrammar } from '@/lib/grammar'

async function ShowGrammar() {
  const grammarElementary = await getAllGrammar('A1-A2')

  return (
    <>
      <div className={styles.level}>
        <h2>A1-A2 grammar</h2>
        <div className={styles.topics}>
          {grammarElementary.map((item: any) => {
            return (
              <div key={item._id}>
                <QuizCard topic={item} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function GrammarPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <ShowGrammar />
      </Suspense>
    </div>
  )
}
