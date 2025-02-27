'use client'

import styles from './BookmarkCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { ICollections } from '@/interfaces/Collections.interface'
import { useState, MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { H3, P } from '@/components/ui/Typography/Typography'

import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'

export const BookmarkCard = ({ item, locale }: { item: ICollections; locale: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleAddBookmark = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <NavigationLink href="/">
      <div className={twMerge(styles['lists-item'], 'dark:bg-[#18223D]')}>
        <div className={styles.info}>
          <div className={styles.image}>
            <Image src={item.image} alt="" />
          </div>
          <div className={styles['info-text']}>
            <div className={styles.header}>
              <H3 className="font-bold mb-2 text-lg">
                {locale === 'en' ? item.title : item.titleUa}
                {locale === 'ua' && (
                  <span className={twMerge(styles.subtitle, 'dark:text-grey-600')}>{item.title}</span>
                )}
              </H3>
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
            <P className="text-[#666666] mb-0 mt-[-9px] overflow-hidden text-sm font-normal">
              {locale === 'en' ? item.description : item.descriptionUa}
            </P>
          </div>
        </div>
        <div className={styles['lists-info']}></div>
      </div>
    </NavigationLink>
  )
}
