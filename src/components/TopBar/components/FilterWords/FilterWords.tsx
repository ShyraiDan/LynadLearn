'use client'

import styles from './FilterWords.module.scss'
import { useState } from 'react'

import { IoIosArrowDown } from 'react-icons/io'

export default function FilterWords() {
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [selectedFilter, setFilter] = useState('newest')

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
        <div className={styles.modal}>
          <ul>
            <li onClick={() => changeFilter('Newest')}>Newest</li>
            <li onClick={() => changeFilter('Alphabet A-Z')}>Alphabet A-Z</li>
            <li onClick={() => changeFilter('Alphabet Z-A')}>Alphabet Z-A</li>
          </ul>
        </div>
      )}
    </>
  )
}
