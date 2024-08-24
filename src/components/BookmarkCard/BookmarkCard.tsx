'use client'

import styles from './BookmarkCard.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ICollections } from '@/interfaces/Collections.interface'
import { Button } from '../ui/Button/Button'
import { useState, MouseEvent } from 'react'

import { BookmarkAdd, BookmarkDelete } from '../ui/Icons/Icons'

export const BookmarkCard = ({ item, locale }: { item: ICollections; locale: string }) => {
  const t = useTranslations('dashboard.collections')
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleAddBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <NavigationLink href='/'>
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
              <Button className={`${isBookmarked && styles.active}`} onClick={(e) => handleAddBookmark(e)}>
                {isBookmarked ? <BookmarkDelete /> : <BookmarkAdd />}
              </Button>
            </div>
            <p>{locale === 'en' ? item.description : item.descriptionUa}</p>
          </div>
        </div>
        <div className={styles['lists-info']}></div>
      </div>
    </NavigationLink>
  )
}
