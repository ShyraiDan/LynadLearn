'use client'

import Image from 'next/image'
import styles from './Dictionary.module.scss'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useState } from 'react'
import DictionaryCard from '@/components/DictionaryCard/DictionaryCard'

import { FaSearch } from 'react-icons/fa'
import { mocks } from '@/mock/Dictionary.mock'
import { DWords } from '@/mock/Words.mock'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'

export default function Dictionary() {
  const t = useTranslations('Dictionary')
  const [search, setSearch] = useState('')

  const firstCol = mocks.filter((_, i) => i % 4 === 0)
  const secondCol = mocks.filter((_, i) => i % 4 === 1)
  const thirdCol = mocks.filter((_, i) => i % 4 === 2)
  const forthCol = mocks.filter((_, i) => i % 4 === 3)

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles['sub-container']}>
          <h1 className={styles.title}>{t('perfect_dictionary')}</h1>
          <div className={styles['input-container']}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              name='search'
              id='search'
              placeholder={t('search_word')}
            />
            <Button>
              <FaSearch />
            </Button>
          </div>
          <p className={styles.desc}>{t('online_dictionary')}</p>
        </div>
      </div>
      <div className={styles['sub-container']}>
        <div className={styles.words}>
          {search.length > 0 &&
            DWords.map((item, i) => {
              return (
                <NavigationLink href={`/dictionary/about`} key={i}>
                  <DictionaryCard key={item.word} word={item} />
                </NavigationLink>
              )
            })}
          {search.length === 0 && (
            <>
              <div className={styles.column}>
                {firstCol.map((item, i) => (
                  <div key={item.title} className={`${styles.card} ${i % 2 !== 0 && styles.expanded}`}>
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <h2>{t(`cards.${item.title}`)}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {secondCol.map((item, i) => (
                  <div key={item.title} className={`${styles.card} ${i % 2 === 0 && styles.expanded}`}>
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <h2>{t(`cards.${item.title}`)}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {thirdCol.map((item, i) => (
                  <div key={item.title} className={`${styles.card} ${i % 2 !== 0 && styles.expanded}`}>
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <h2>{t(`cards.${item.title}`)}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {forthCol.map((item, i) => (
                  <div key={item.title} className={`${styles.card} ${i % 2 === 0 && styles.expanded}`}>
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <h2>{t(`cards.${item.title}`)}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
