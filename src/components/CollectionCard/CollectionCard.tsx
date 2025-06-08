'use client'

import styles from './CollectionCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ICollections } from '@/interfaces/Collections.interface'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { H3, P } from '../ui/Typography/Typography'
import { addBookmark, removeBookmark } from '@/lib/bookmark'
import { toast } from 'sonner'
import { findBookmarkType } from '@/utils/findBookmarkType'

import { FaBookOpen, FaClock, FaArrowRight } from 'react-icons/fa6'
import { MdPlayLesson } from 'react-icons/md'
import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'
import { ISession } from '@/lib/auth'

interface CollectionCardProps {
  item: ICollections
  locale: string
  redirectLink: string
  session: ISession
}

export const CollectionCard = ({ item, locale, redirectLink, session }: CollectionCardProps) => {
  const t = useTranslations('dashboard.collections')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkId, setBookmarkId] = useState(item?.bookmarkId)

  useEffect(() => {
    setIsBookmarked(!!item?.isBookmarked)
  }, [item])

  const handleAddBookmark = async () => {
    if (!session?.userId) {
      return
    }

    if (!isBookmarked) {
      const itemType = findBookmarkType(redirectLink.split('/')[2])

      const bookmarkItem = {
        titleEn: item.title,
        titleUa: item.titleUa,
        url: redirectLink,
        image: item.image,
        itemId: item._id,
        itemType: itemType,
        descriptionEn: item.description,
        descriptionUa: item.descriptionUa
      }

      const result = await addBookmark(session?.userId, bookmarkItem)

      if (result.success) {
        toast.success(t('successfully_add_bookmark'), {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-white-100'
        })
        setBookmarkId(result.id)
        setIsBookmarked(!isBookmarked)
      } else {
        toast.error(t('error_add_bookmark'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    } else {
      if (!bookmarkId) {
        toast.error(t('error_remove_bookmark'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })

        return
      }

      const result = await removeBookmark(bookmarkId)

      if (result.success) {
        toast.success(t('successfully_remove_bookmark'), {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-white-100'
        })

        setIsBookmarked(!isBookmarked)
      } else {
        toast.error(t('error_remove_bookmark'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    }
  }

  return (
    <div className={twMerge(styles['lists-item'], 'dark:bg-[#18223D]')}>
      <div className={styles.info}>
        <div className={styles.image}>
          <Image
            src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/core/collections/${item.image}`}
            alt={item.image}
            unoptimized
            width={110}
            height={165}
          />
        </div>
        <div className={styles['info-text']}>
          <div className={styles.header}>
            <H3 className="font-bold mb-2 text-lg">
              {locale === 'en' ? item.title : item.titleUa}
              {locale === 'ua' && <span className="dark:!text-grey-600">{item.title}</span>}
            </H3>
            <div
              className={twMerge(
                styles['button-bookmark'],
                'dark:bg-[#1D2D4D]',
                isBookmarked && `${styles.active} dark:bg-blue-200`
              )}
              onClick={() => handleAddBookmark()}
            >
              {isBookmarked ? <BookmarkDelete /> : <BookmarkAdd className="dark:stroke-white-100" />}
            </div>
          </div>
          <P className="text-[#666666] mb-0 mt-[-9px] overflow-hidden text-sm font-normal">
            {locale === 'en' ? item.description : item.descriptionUa}
          </P>
        </div>
      </div>
      <div className={styles['lists-info']}>
        <div className={styles['lists-stats']}>
          <div className={styles['lists-stats-item']}>
            <FaBookOpen className="dark:text-grey-600" />
            <P>
              <span>{item.lessons}</span> {t('lessons')}
            </P>
          </div>
          <div className={styles['lists-stats-item']}>
            <MdPlayLesson className="dark:text-grey-600" />
            <P>
              <span>{item.words}</span> {t('words')}
            </P>
          </div>
          <div className={styles['lists-stats-item']}>
            <FaClock className="dark:text-grey-600" />
            <P>
              <span>
                {Math.floor(item.words / 60)} {t('hours')} {Math.ceil((item.words % 60) / 2)} {t('minutes')}
              </span>
            </P>
          </div>
        </div>
        <NavigationLink href={redirectLink}>
          <FaArrowRight />
        </NavigationLink>
      </div>
    </div>
  )
}
