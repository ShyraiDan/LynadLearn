import styles from './grammarPage.module.scss'

import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { DGrammar } from '@/mock/Grammar.mock'

export default function grammarPage() {
  return (
    <div className={styles.container}>
      {DGrammar.map((item) => {
        return (
          <div key={item.id} className={styles.level}>
            <h2>{item.level}</h2>
            <div className={styles.topics}>
              {item.topics.map((topic) => (
                <NavigationLink className={styles.item} key={topic.id} href={`/dashboard/grammar/${topic.id}`}>
                  <div key={topic.id}>{topic.title}</div>
                </NavigationLink>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
