'use client'

import TopBar from './components/TopBar/TopBar'
import WordsTable from './components/WordsTable/WordsTable'
import { useState } from 'react'

import styles from './VocabularyPage.module.scss'

export default function VocabularyPage() {
  const [isAdding, setAdding] = useState(false)

  return (
    <div className={styles.container}>
      <TopBar isAdding={isAdding} setAdding={setAdding} />
      <WordsTable isAdding={isAdding} setAdding={setAdding} />
    </div>
  )
}
