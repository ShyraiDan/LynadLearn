'use client'

import styles from './FilterWords.module.scss'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { IoIosArrowDown } from 'react-icons/io'

export default function FilterWords() {
  const t = useTranslations('dashboard.vocabulary')

  const [isFilterOpen, setFilterOpen] = useState(false)
  const [selectedFilter, setFilter] = useState(t('newest'))

  const changeFilter = (filter: string) => {
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
          <li onClick={() => changeFilter(t('newest'))}>{t('newest')}</li>
          <li onClick={() => changeFilter(t('alphabeta-z'))}>{t('alphabeta-z')}</li>
          <li onClick={() => changeFilter(t('alphabetz-a'))}>{t('alphabetz-a')}</li>
        </ul>
      )}
    </>
  )
}
