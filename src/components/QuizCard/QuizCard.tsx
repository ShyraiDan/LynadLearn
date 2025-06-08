'use client'

import styles from './QuizCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { H4, P } from '@/components/ui/Typography/Typography'

import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'
import { addBookmark, removeBookmark } from '@/lib/bookmark'
import { ISession } from '@/lib/auth'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { mutate } from 'swr'

type TQuizCard = {
  topic: IGrammarTopic
  lang: string
  type: 'grammar' | 'quiz'
  session?: ISession
}

export default function QuizCard({ topic, lang, session, type }: TQuizCard) {
  const t = useTranslations('dashboard.quiz')

  const handleAddBookmark = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!session?.userId) {
      return
    }

    if (!topic.isBookmarked) {
      const redirectLink = `/dashboard/${type}/${topic._id}`

      const bookmarkItem = {
        titleEn: topic.title,
        titleUa: topic.titleUa,
        url: redirectLink,
        image: '',
        itemId: topic._id,
        itemType: type,
        descriptionEn: topic.data.description[0].en,
        descriptionUa: topic.data.description[0].ua
      }

      const result = await addBookmark(session?.userId, bookmarkItem)

      if (result.success) {
        toast.success(t('successfully_add_bookmark'), {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-white-100'
        })

        mutate(`/api/grammar?activityType=${type}`)
      } else {
        toast.error(t('error_add_bookmark'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    } else {
      if (!topic.bookmarkId) {
        toast.error(t('error_remove_bookmark'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })

        return
      }

      const result = await removeBookmark(topic.bookmarkId)

      if (result.success) {
        toast.success(t('successfully_remove_bookmark'), {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-white-100'
        })

        mutate(`/api/grammar?activityType=${type}`)
      } else {
        toast.error(t('error_remove_bookmark'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    }
  }

  return (
    <NavigationLink
      className={twMerge(styles.item, 'dark:bg-[#18223D] dark:lg:hover:bg-[#1D2D4D] dark:[&_p]:lg:hover:text-grey-600')}
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
            topic.isBookmarked && `${styles.active} dark:bg-blue-200`
          )}
          onClick={(e) => handleAddBookmark(e)}
        >
          {topic.isBookmarked ? <BookmarkDelete /> : <BookmarkAdd className="dark:stroke-white-100" />}
        </div>
      </div>
      <P className="m-0 text-sm duration-150 dark:text-grey-600">
        {lang === 'en' ? topic.data.description[0].en : topic.data.description[0].ua}
      </P>
    </NavigationLink>
  )
}
