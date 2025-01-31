import styles from './SingleGrammar.module.scss'
import { getTranslations } from 'next-intl/server'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { getSingleGrammar } from '@/lib/grammar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { twMerge } from 'tailwind-merge'
import { IGrammarExample } from '@/interfaces/Grammar.interface'
import { H1, H2, H3, P } from '@/components/ui/Typography/Typography'

type TSingleGrammarPage = {
  params: {
    id: string
    locale: string
  }
}

async function Grammar({ params }: TSingleGrammarPage) {
  const grammar = await getSingleGrammar(params.id)
  const t = await getTranslations('dashboard.grammar')

  if (!grammar) {
    return (
      <div className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">
        <H3 className="dark:text-grey-600">{t('no_grammar')}</H3>
        <NavigationLink href="/dashboard/grammar">{t('move_to_grammar')}</NavigationLink>
      </div>
    )
  }

  return (
    <>
      {grammar && (
        <div className={styles.container}>
          <H1 className="text-blue-200 text-center font-bold text-lg md:text-2xl">
            {params.locale === 'en' ? grammar.title : grammar.titleUa}
          </H1>
          {grammar.data.description.map((item, i) => (
            <P className="mt-5 text-blue-300 dark:text-grey-600" key={i}>
              {params.locale === 'en' ? item.en : item.ua}
            </P>
          ))}

          <div className={styles.examples}>
            {grammar.data.example.map((item) => (
              <>
                <H2 className="my-3 font-bold text-lg text-blue-200 md:text-2xl">
                  {params.locale === 'en' ? item.title : item.titleUa}
                </H2>
                <P className="text-blue-300">{params.locale === 'en' ? item.description : item.descriptionUa}</P>

                <ul className={twMerge(styles['example-list'], 'dark:bg-[#1D2D4D] dark:border-l-purple-100')}>
                  {item.examples.map((item: IGrammarExample, i: number) => (
                    <li className="dark:text-grey-600" key={`example-${i}`}>
                      {item.exampleEn}
                      {params.locale === 'ua' && <P className="text-purple-100 text-sm">({item.exampleUa})</P>}
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </div>
          <div className={styles.test}>
            <NavigationLink href={`/dashboard/quiz/${grammar.quizId}`}>{t('move_to_test')}</NavigationLink>
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
