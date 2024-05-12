'use client'

import styles from './QuizPage.module.scss'
import { useState } from 'react'
import { DGrammar } from '@/mock/Grammar.mock'
import QuizCard from '@/components/QuizCard/QuizCard'

export default function QuizPage() {
  const [type, setType] = useState('grammar')
  const len = 0

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
          <div className={styles.items}>
            {type === 'grammar' ? (
              DGrammar.map((item) => (
                <div key={item.id} className={styles.level}>
                  <h2>{item.level}</h2>
                  <div className={styles.topics}>
                    {item.topics.map((topic) => (
                      <>
                        <QuizCard key={topic.id} topic={topic} />
                      </>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.level}>
                {len === 0 && (
                  <div className={styles['no-list']}>
                    <h2>There are no lists for this category</h2>
                  </div>
                )}
                {len !== 0 && (
                  <>
                    <h2>Select your list</h2>
                    <div className={styles.topics}></div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.sections}></div>
      </div>
    </>
  )
}
