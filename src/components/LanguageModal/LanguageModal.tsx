'use client'

import { useState } from 'react'
import styles from './LanguageModal.module.scss'

import { IoIosArrowDown } from 'react-icons/io'

export default function LanguageModal() {
  const [isLanguageModal, setLanguageModal] = useState(false)

  return (
    <>
      <li className={styles['nav-item']} onClick={() => setLanguageModal((state) => !state)}>
        English
        <IoIosArrowDown className={`${styles.arrow} ${isLanguageModal && styles.active}`} />
      </li>
      {isLanguageModal && (
        <div className={styles.modal}>
          <ul>
            <li>English</li>
            <li>Ukrainian</li>
          </ul>
        </div>
      )}
    </>
  )
}
