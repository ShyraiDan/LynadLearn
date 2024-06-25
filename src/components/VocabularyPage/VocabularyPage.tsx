'use client'

import { useState } from 'react'
import TopBar from './components/TopBar/TopBar'
import WordsTable from './components/WordsTable/WordsTable'
import { Suspense, useEffect } from 'react'

import styles from './VocabularyPage.module.scss'
import { getListById } from '@/lib/lists'
import { useParams } from 'next/navigation'

export default function VocabularyPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>()

  useEffect(() => {
    getListById(id as string).then((res) => {
      try {
        setData(res)
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  return (
    <div className={styles.container}>
      <TopBar />
      <WordsTable list={data} />
    </div>
  )
}
