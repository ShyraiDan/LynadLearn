'use client'

import Image from 'next/image'
import styles from './Dictionary.module.scss'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { useState, useEffect } from 'react'
import DictionaryCard from '@/components/DictionaryCard/DictionaryCard'
import { H1, H2, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'
import { useDebounce } from '@/hooks/useDebounce'
import { IWord } from '@/interfaces/Word.interface'
import { getSearchDefaultWords } from '@/lib/defaultWords'

import { FaSearch } from 'react-icons/fa'
import { mocks } from '@/mock/Dictionary.mock'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'

export default function Dictionary() {
  const t = useTranslations('Dictionary')
  const [search, setSearch] = useState('')
  const debouncedQuery = useDebounce(search, 500)
  const [searchOptions, setSearchOptions] = useState<IWord[]>([])

  useEffect(() => {
    getSearchDefaultWords(debouncedQuery).then((data) => setSearchOptions(data))
  }, [debouncedQuery])

  const firstCol = mocks.filter((_, i) => i % 4 === 0)
  const secondCol = mocks.filter((_, i) => i % 4 === 1)
  const thirdCol = mocks.filter((_, i) => i % 4 === 2)
  const forthCol = mocks.filter((_, i) => i % 4 === 3)

  return (
    <Container className={styles.container}>
      <div className={`${styles.heading} dark:bg-[#18223D]`}>
        <div className={styles['sub-container']}>
          <H1 className="text-center font-bold mt-4 mb-3 text-lg sm:text-2xl md:mb-6 lg:text-[40px] dark:text-grey-600">
            {t('perfect_dictionary')}
          </H1>
          <div className={styles['input-container']}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search"
              id="search"
              placeholder={t('search_word')}
            />
            <Button>
              <FaSearch />
            </Button>
          </div>
          <P className="mt-4 leading-5 text-justify text-sm sm:text-base md:mt-6 md:px-8 md:text-center md:w-[770px] md:mx-auto lg:px-0 lg:w-full lg:text-center lg:text-lg dark:text-grey-600">
            {t('online_dictionary')}
          </P>
        </div>
      </div>
      <div className={styles['sub-container']}>
        <div className={styles.words}>
          {searchOptions.length > 0 &&
            searchOptions.map((item) => {
              return (
                <NavigationLink href={`/dictionary/${item._id}`} key={item._id}>
                  <DictionaryCard word={item} />
                </NavigationLink>
              )
            })}
          {searchOptions.length === 0 && (
            <>
              <div className={styles.column}>
                {firstCol.map((item, i) => (
                  <div
                    key={item.title}
                    className={`${styles.card} ${
                      i % 2 !== 0 && styles.expanded
                    } dark:bg-[#18223D] dark:lg:hover:bg-[#222e4b]`}
                  >
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <H2 className="dark:text-grey-600 mb-0">{t(`cards.${item.title}`)}</H2>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {secondCol.map((item, i) => (
                  <div
                    key={item.title}
                    className={`${styles.card} ${
                      i % 2 === 0 && styles.expanded
                    } dark:bg-[#18223D] dark:lg:hover:bg-[#222e4b]`}
                  >
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <H2 className="dark:text-grey-600 mb-0">{t(`cards.${item.title}`)}</H2>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {thirdCol.map((item, i) => (
                  <div
                    key={item.title}
                    className={`${styles.card} ${
                      i % 2 !== 0 && styles.expanded
                    } dark:bg-[#18223D] dark:lg:hover:bg-[#222e4b]`}
                  >
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <H2 className="dark:text-grey-600 mb-0">{t(`cards.${item.title}`)}</H2>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {forthCol.map((item, i) => (
                  <div
                    key={item.title}
                    className={`${styles.card} ${
                      i % 2 === 0 && styles.expanded
                    } dark:bg-[#18223D] dark:lg:hover:bg-[#222e4b]`}
                  >
                    <div>
                      <div className={styles.photos}>
                        <Image src={item.image} alt={item.title} />
                      </div>
                      <H2 className="dark:text-grey-600 mb-0">{t(`cards.${item.title}`)}</H2>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}
