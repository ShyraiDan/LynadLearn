'use client'

import styles from './CollectionCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ICollections } from '@/interfaces/Collections.interface'
import { Button } from '../ui/Button/Button'
import { useState } from 'react'

import { FaBookOpen, FaClock, FaArrowRight } from 'react-icons/fa6'
import { MdPlayLesson } from 'react-icons/md'
import { BookmarkAdd, BookmarkDelete } from '../ui/Icons/Icons'

export const CollectionCard = ({ item, locale }: { item: ICollections; locale: string }) => {
  const t = useTranslations('dashboard.collections')
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleAddBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className={styles['lists-item']}>
      <div className={styles.info}>
        <div className={styles.image}>
          <Image src={item.image} alt='' />
        </div>
        <div className={styles['info-text']}>
          <div className={styles.header}>
            <h3>
              {locale === 'en' ? item.title : item.titleUa}
              {locale === 'ua' && <span>{item.title}</span>}
            </h3>
            <Button className={`${isBookmarked && styles.active}`} onClick={() => handleAddBookmark()}>
              {isBookmarked ? <BookmarkDelete /> : <BookmarkAdd />}
            </Button>
          </div>
          <p>{locale === 'en' ? item.description : item.descriptionUa}</p>
        </div>
      </div>
      <div className={styles['lists-info']}>
        <div className={styles['lists-stats']}>
          <div className={styles['lists-stats-item']}>
            <FaBookOpen />
            <p>
              <span>{item.lessons}</span> {t('lessons')}
            </p>
          </div>
          <div className={styles['lists-stats-item']}>
            <MdPlayLesson />
            <p>
              <span>{item.words}</span> {t('words')}
            </p>
          </div>
          <div className={styles['lists-stats-item']}>
            <FaClock />
            <p>
              <span>
                {Math.floor(item.words / 120)} {t('hours')} {Math.ceil((item.words % 60) / 2)} {t('minutes')}
              </span>
            </p>
          </div>
        </div>
        <NavigationLink href='/'>
          <FaArrowRight />
        </NavigationLink>
      </div>
    </div>
  )
}
