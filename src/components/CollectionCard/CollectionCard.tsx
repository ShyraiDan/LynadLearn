'use client'

import styles from './CollectionCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ICollections } from '@/interfaces/Collections.interface'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { FaBookOpen, FaClock, FaArrowRight } from 'react-icons/fa6'
import { MdPlayLesson } from 'react-icons/md'
import { BookmarkAdd, BookmarkDelete } from '@/components/ui/Icons/Icons'

export const CollectionCard = ({ item, locale }: { item: ICollections; locale: string }) => {
  const t = useTranslations('dashboard.collections')
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleAddBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className={twMerge(styles['lists-item'], 'dark:bg-[#18223D]')}>
      <div className={styles.info}>
        <div className={styles.image}>
          <Image src={item.image} alt="" />
        </div>
        <div className={styles['info-text']}>
          <div className={styles.header}>
            <h3 className="dark:text-grey-600">
              {locale === 'en' ? item.title : item.titleUa}
              {locale === 'ua' && <span className="dark:!text-grey-600">{item.title}</span>}
            </h3>
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
          <p className="dark:!text-grey-600">{locale === 'en' ? item.description : item.descriptionUa}</p>
        </div>
      </div>
      <div className={styles['lists-info']}>
        <div className={styles['lists-stats']}>
          <div className={styles['lists-stats-item']}>
            <FaBookOpen className="dark:text-grey-600" />
            <p className="dark:text-grey-600">
              <span>{item.lessons}</span> {t('lessons')}
            </p>
          </div>
          <div className={styles['lists-stats-item']}>
            <MdPlayLesson className="dark:text-grey-600" />
            <p className="dark:text-grey-600">
              <span>{item.words}</span> {t('words')}
            </p>
          </div>
          <div className={styles['lists-stats-item']}>
            <FaClock className="dark:text-grey-600" />
            <p className="dark:text-grey-600">
              <span>
                {Math.floor(item.words / 120)} {t('hours')} {Math.ceil((item.words % 60) / 2)} {t('minutes')}
              </span>
            </p>
          </div>
        </div>
        <NavigationLink href="/">
          <FaArrowRight />
        </NavigationLink>
      </div>
    </div>
  )
}
