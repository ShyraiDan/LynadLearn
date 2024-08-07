import styles from './SingleGrammar.module.scss'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getSingleGrammar } from '@/lib/grammar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'

type TSingleGrammarPage = {
  params: {
    id: any
  }
}

//TODO add message when we don't have any topic

async function Grammar({ params }: TSingleGrammarPage) {
  const grammar = await getSingleGrammar(params.id)
  const t = await getTranslations('dashboard.grammar')

  return (
    <>
      {grammar && (
        <div className={styles.container}>
          <h1>{grammar.title}</h1>
          {grammar.data.description.map((item, i) => (
            <p key={i}>{item}</p>
          ))}

          <div className={styles.examples}>
            {grammar.data.example.map((item, i) => (
              <>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <ul>
                  {item.examples.map((item: any, i: number) => (
                    <li key={`example-${i}`}>{item}</li>
                  ))}
                </ul>
              </>
            ))}
          </div>
          <div className={styles.test}>
            <NavigationLink href={`/dashboard/quiz/${params.id}`}>{t('move_to_test')}</NavigationLink>
          </div>
        </div>
      )}

      {!grammar && <div>No topic</div>}
    </>
  )
}

export default function SingleGrammarPage({ params }: TSingleGrammarPage) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader dimensionClass={styles.loader} />}>
        <Grammar params={params} />
      </Suspense>
    </div>
  )
}
