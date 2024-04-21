import styles from './QuizCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'

export default function QuizCard({ topic }: { topic: IGrammarTopic }) {
  return (
    <NavigationLink className={styles.item} key={topic.id} href={`/dashboard/grammar/${topic.id}`}>
      <div key={topic.id}>{topic.title}</div>
    </NavigationLink>
  )
}
