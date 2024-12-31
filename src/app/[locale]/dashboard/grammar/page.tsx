import styles from './GrammarPage.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getAllGrammar } from '@/lib/grammar'
import { twMerge } from 'tailwind-merge'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'

interface IGrammarPageProps {
  params: {
    locale: string
  }
}

interface IShowGrammarProps {
  params: {
    locale: string
  }
}

async function ShowGrammar({ params }: IShowGrammarProps) {
  const grammarElementary = await getAllGrammar('A1-A2')

  return (
    <>
      <div className={styles.level}>
        <h2 className={twMerge(styles.title, 'dark:text-grey-600')}>A1-A2 grammar</h2>
        <div className={styles.topics}>
          {grammarElementary.map((item: IGrammarTopic, i) => {
            return (
              <div key={item._id} className={`${styles.item}  ${styles[`item-${(i % 8) + 1}`]}`}>
                <QuizCard topic={item} lang={params.locale} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function GrammarPage({ params }: IGrammarPageProps) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <ShowGrammar params={params} />
      </Suspense>
    </div>
  )
}
