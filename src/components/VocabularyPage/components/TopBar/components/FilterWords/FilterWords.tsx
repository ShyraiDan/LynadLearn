'use client'

import styles from './FilterWords.module.scss'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { IoIosArrowDown } from 'react-icons/io'

export default function FilterWords() {
  const t = useTranslations('dashboard.vocabulary')
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [selectedFilter, setFilter] = useState(t('newest'))
  const router = useRouter()

  const changeFilter = (filter: string, filterType: string) => {
    router.push(`?sort=${filterType}`)
    setFilter(filter)
    setFilterOpen(false)
  }

  return (
    <>
      <div className={styles.filters} onClick={() => setFilterOpen((state) => !state)}>
        {selectedFilter}
        <IoIosArrowDown className={`${styles.arrow} ${isFilterOpen && styles.active}`} />
      </div>
      {isFilterOpen && (
        <ul className={styles.modal}>
          <li onClick={() => changeFilter(t('newest'), 'newest')}>{t('newest')}</li>
          <li onClick={() => changeFilter(t('alphabeta-z'), 'a-z')}>{t('alphabeta-z')}</li>
          <li onClick={() => changeFilter(t('alphabetz-a'), 'z-a')}>{t('alphabetz-a')}</li>
        </ul>
      )}
    </>
  )
}
