import styles from './QuizCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'

export default function QuizCard({ topic }: { topic: IGrammarTopic }) {
  return (
    <NavigationLink className={styles.item} href={`/dashboard/grammar/${topic.id}`}>
      <div>{topic.title}</div>
    </NavigationLink>
  )
}
