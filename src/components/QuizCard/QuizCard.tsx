'use client'

import styles from './QuizCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { useState, MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { H4, P } from '@/components/ui/Typography/Typography'

import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'

type TQuizCard = {
  topic: IGrammarTopic
  lang: string
  allowedAction?: (id: string) => boolean
}

export default function QuizCard({ topic, lang, allowedAction }: TQuizCard) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleAddBookmark = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const isAuth = allowedAction ? allowedAction(topic._id) : false

    if (isAuth) {
      setIsBookmarked(!isBookmarked)
    }
  }

  return (
    <NavigationLink
      className={twMerge(styles.item, 'dark:bg-[#18223D] dark:hover:bg-[#1D2D4D] dark:[&_p]:hover:text-grey-600')}
      href={`/dashboard/grammar/${topic._id}`}
    >
      <div className={styles.top}>
        <H4 className="m-0 font-bold text-base duration-150 mb-2 md:text-lg lg:text-xl">
          {lang === 'en' ? topic.title : topic.titleUa}
        </H4>
        <div
          className={twMerge(
            styles['button-bookmark'],
            'dark:bg-[#1D2D4D]',
            isBookmarked && `${styles.active} dark:bg-blue-200`
          )}
          onClick={(e) => handleAddBookmark(e)}
        >
          {isBookmarked ? <BookmarkDelete /> : <BookmarkAdd className="dark:stroke-white-100" />}
        </div>
      </div>
      <P className="m-0 text-sm duration-150 dark:text-grey-600">
        {lang === 'en' ? topic.data.description[0].en : topic.data.description[0].ua}
      </P>
    </NavigationLink>
  )
}
