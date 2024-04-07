'use client'

import styles from './QuizPage.module.scss'
import { useState } from 'react'

export default function QuizPage() {
  const [type, setType] = useState('grammar')

  return (
    <>
      <div className={styles.container}>
        <h2>Quiz page</h2>
        <div className={styles.sections}>
          <div className={styles.top}>
            <h4>Filter</h4>
            <div className={styles.tags}>
              <span onClick={() => setType('grammar')} className={`${type === 'grammar' && styles.active}`}>
                Grammar
              </span>
              <span onClick={() => setType('vocabulary')} className={`${type === 'vocabulary' && styles.active}`}>
                Vocabulary
              </span>
            </div>
          </div>
          <div className={styles.items}></div>
        </div>
        <div className={styles.sections}></div>
      </div>
    </>
  )
}
