'use client'

import styles from './QuizCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { Button } from '@/components/ui/Button/Button'
import { useState, MouseEvent } from 'react'

import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'

type TQuizCard = {
  topic: IGrammarTopic
  lang: string
}

export default function QuizCard({ topic, lang }: TQuizCard) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleAddBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <NavigationLink className={styles.item} href={`/dashboard/grammar/${topic._id}`}>
      <div className={styles.top}>
        <h4>{lang === 'en' ? topic.title : topic.titleUa}</h4>
        <Button className={`${isBookmarked && styles.active}`} onClick={(e) => handleAddBookmark(e)}>
          {isBookmarked ? <BookmarkDelete /> : <BookmarkAdd />}
        </Button>
      </div>
      <p>{topic.data.description[0]}</p>
    </NavigationLink>
  )
}
