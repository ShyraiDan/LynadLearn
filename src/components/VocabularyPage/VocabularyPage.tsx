'use client'

import { useState } from 'react'
import TopBar from './components/TopBar/TopBar'
import WordsTable from './components/WordsTable/WordsTable'
import { Suspense, useEffect } from 'react'

import styles from './VocabularyPage.module.scss'
import { getListById } from '@/lib/lists'
import { useParams } from 'next/navigation'
import { IList } from '@/interfaces/List.interface'

export default function VocabularyPage() {
  const { id } = useParams()
  const [data, setData] = useState<IList | null>(null)

  useEffect(() => {
    getListById(id as string).then((res) => {
      setData(res)
    })
  }, [])

  return (
    <div className={styles.container}>
      <TopBar />
      {data !== null && <WordsTable list={data} />}
    </div>
  )
}
