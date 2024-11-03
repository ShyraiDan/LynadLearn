import styles from './SingleGrammar.module.scss'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getSingleGrammar } from '@/lib/grammar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { twMerge } from 'tailwind-merge'

type TSingleGrammarPage = {
  params: {
    id: any
  }
}

async function Grammar({ params }: TSingleGrammarPage) {
  const grammar = await getSingleGrammar(params.id)
  const t = await getTranslations('dashboard.grammar')

  if (!grammar) {
    return (
      <div className={styles['no-grammar']}>
        <h3 className='dark:text-grey-600'>{t('no_grammar')}</h3>
        <NavigationLink href='/dashboard/grammar'>{t('move_to_grammar')}</NavigationLink>
      </div>
    )
  }

  return (
    <>
      {grammar && (
        <div className={styles.container}>
          <h1 className='dark:text-grey-600'>{grammar.title}</h1>
          {grammar.data.description.map((item, i) => (
            <p className='dark:text-grey-600' key={i}>
              {item}
            </p>
          ))}

          <div className={styles.examples}>
            {grammar.data.example.map((item, i) => (
              <>
                <h2 className={twMerge(styles['example-title'], 'dark:text-grey-600')}>{item.title}</h2>
                <p className={twMerge(styles['example-description'], 'dark:text-grey-600')}>{item.description}</p>
                <ul className={twMerge(styles['example-list'], 'dark:bg-[#1D2D4D] dark:border-l-purple-100')}>
                  {item.examples.map((item: any, i: number) => (
                    <li className='dark:text-grey-600' key={`example-${i}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </div>
          <div className={styles.test}>
            <NavigationLink href={`/dashboard/quiz/${grammar.quizId}?type=grammar`}>{t('move_to_test')}</NavigationLink>
          </div>
        </div>
      )}
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
