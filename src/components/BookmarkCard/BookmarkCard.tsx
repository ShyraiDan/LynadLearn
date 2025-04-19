'use client'

import styles from './BookmarkCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'
import { useState, MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { H3, P } from '@/components/ui/Typography/Typography'

import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'
import noImage from '@/assets/no-image.jpg'

export const BookmarkCard = ({ item, locale }: { item: IBookmarks; locale: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(true)

  const handleAddBookmark = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <NavigationLink href={item.url}>
      <div className={twMerge(styles['lists-item'], 'dark:bg-[#18223D]')}>
        <div className={styles.info}>
          <div className={styles.image}>
            <Image
              src={
                item.image
                  ? `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/core/collections/${item.image}`
                  : noImage
              }
              alt={locale === 'en' ? item.titleEn : item.titleUa}
              unoptimized={!!item.image}
              width={110}
              height={165}
            />
          </div>

          <div className={styles['info-text']}>
            <div className={styles.header}>
              <H3 className="font-bold mb-2 text-lg">
                {locale === 'en' ? item.titleEn : item.titleUa}
                {locale === 'ua' && (
                  <span className={twMerge(styles.subtitle, 'dark:text-grey-600')}>{item.titleUa}</span>
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
            {item.descriptionEn && item.descriptionUa && (
              <P className="text-[#666666] mb-0 mt-[-9px] overflow-hidden text-sm font-normal">
                {locale === 'en' ? item.descriptionEn : item.descriptionUa}
              </P>
            )}
          </div>
        </div>
        <div className={styles['lists-info']}></div>
      </div>
    </NavigationLink>
  )
}
