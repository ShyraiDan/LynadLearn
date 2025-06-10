'use client'

import DictionaryCard from '@/components/DictionaryCard/DictionaryCard'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import { Input } from '@/components/ui/Input/Input'
import { P } from '@/components/ui/Typography/Typography'
import { useDebounce } from '@/hooks/useDebounce'
import { IWord } from '@/interfaces/Word.interface'
import { getSearchDefaultWords } from '@/lib/defaultWords'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminAddWordModal } from '@/components/Admin/AdminAddWordModal/AdminAddWordModal'

import { FaSearch } from 'react-icons/fa'

export default function AdminVocabularyPage() {
  const [search, setSearch] = useState('')
  const debouncedQuery = useDebounce(search, 500)
  const [searchOptions, setSearchOptions] = useState<IWord[]>([])

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      getSearchDefaultWords(debouncedQuery).then((data) => setSearchOptions(data))
    }
  }, [debouncedQuery])

  return (
    <>
      <Container className="min-h-[calc(100vh-201px-73px)] sm:min-h-[calc(100vh-193px-81px)] md:min-h-[calc(100vh-153px-81px)] lg:min-h-[calc(100vh-97px-81px)] mt-4">
        <div className="flex justify-end">
          <AdminAddWordModal />
        </div>

        <div className="py-8 px-4 flex flex-col lg:pt-12">
          <div className="mx-auto md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]">
            <div className="flex">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder="Enter word"
                className="!rounded-l-3xl !border-r-0 !rounded-r-none"
              />
              <Button className="!rounded-none !rounded-r-3xl px-4 md:px-8">
                <FaSearch />
              </Button>
            </div>
            <P className="mt-4 leading-5 text-justify text-sm sm:text-base md:mt-6 md:px-8 md:text-center md:w-[770px] md:mx-auto lg:px-0 lg:w-full lg:text-center lg:text-lg dark:text-grey-600">
              An online dictionary for learners of American English, offering free access to definitions, images,
              example sentences, synonyms, and more
            </P>
          </div>
        </div>
        <div className="mx-auto md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]">
          <div className="mx-auto grid grid-cols-1 gap-4 my-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {searchOptions.length > 0 &&
              searchOptions.map((item) => {
                return (
                  <Link href={`/admin/dashboard/vocabulary/${item._id}`} key={item._id}>
                    <DictionaryCard word={item} />
                  </Link>
                )
              })}
          </div>
        </div>
      </Container>
    </>
  )
}
