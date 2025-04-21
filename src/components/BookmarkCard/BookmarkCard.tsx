'use client'

import styles from './BookmarkCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'
import { useState, MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { H3, P } from '@/components/ui/Typography/Typography'
import { removeBookmark } from '@/lib/bookmark'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { KeyedMutator } from 'swr'

import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'
import noImage from '@/assets/no-image.jpg'

interface BookmarkCardProps {
  item: IBookmarks
  locale: string
  onRefresh: KeyedMutator<IBookmarks[]>
}

export const BookmarkCard = ({ item, locale, onRefresh }: BookmarkCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(true)
  const t = useTranslations('dashboard.bookmarks')

  const handleRemoveBookmark = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const result = await removeBookmark(item._id)

    if (result.success) {
      toast.success(t('successfully_remove_bookmark'), {
        duration: 3000,
        className: 'border border-green-100 bg-green-100 text-white-100'
      })

      setIsBookmarked(!isBookmarked)
      onRefresh()
    } else {
      toast.error(t('error_remove_bookmark'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
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
                onClick={(e) => handleRemoveBookmark(e)}
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
