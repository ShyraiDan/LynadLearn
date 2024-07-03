import styles from './grammarPage.module.scss'
import QuizCard from '@/components/QuizCard/QuizCard'

import { DGrammar } from '@/mock/Grammar.mock'

export default function GrammarPage() {
  return (
    <div className={styles.container}>
      {DGrammar.map((item) => {
        return (
          <div key={item.id} className={styles.level}>
            <h2>{item.level}</h2>
            <div className={styles.topics}>
              {item.topics.map((topic) => (
                <>
                  <QuizCard key={topic.id} topic={topic} />
                </>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
