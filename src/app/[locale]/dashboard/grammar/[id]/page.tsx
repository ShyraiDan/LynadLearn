import styles from './SingleGrammar.module.scss'
import { useTranslations } from 'next-intl'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'

import { DGrammar } from '@/mock/Grammar.mock'

export default function BlogPostPage({ params }: any) {
  const data = DGrammar[params.id - 1].topics[0]
  const t = useTranslations('dashboard.grammar')

  return (
    <div className={styles.container}>
      <h1>{data.title}</h1>
      {data.data?.description.map((item: string, i) => {
        return <p key={`description-${i}`}>{item}</p>
      })}
      <div className={styles.examples}>
        {data.data?.example.map((item, i) => {
          return (
            <>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <ul>
                {item.examples.map((item, i) => (
                  <li key={`example-${i}`}>{item}</li>
                ))}
              </ul>
            </>
          )
        })}
      </div>
      <div className={styles.test}>
        <NavigationLink href='/'>{t('move_to_test')}</NavigationLink>
      </div>
    </div>
  )
}
