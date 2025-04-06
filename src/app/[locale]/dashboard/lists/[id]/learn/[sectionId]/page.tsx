'use client'

import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import styles from './LearnCategoryPage.module.scss'
import { WordCard } from '@/components/WordCard/WordCard'
import Button from '@/components/ui/Button/Button'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ISection } from '@/interfaces/Section.interface'
import Container from '@/components/ui/Container/Container'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'
import { H3, P } from '@/components/ui/Typography/Typography'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { ConfettiContainer } from '@/HOC/ConfettiContainer'
import Loader from '@/components/Loader/Loader'

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import finishImage from '@/assets/finish.png'

interface LearnCategoryPageProps {
  params: {
    locale: string
    sectionId: string
    id: string
  }
}

export default function LearnCategoryPage({ params }: LearnCategoryPageProps) {
  const { sectionId, id, locale } = params
  const [word, setWord] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations('dashboard.lists')

  const {
    data: section,
    isLoading,
    error
  } = useSWR<ISection>(`/api/section/${sectionId}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  const handleOpenPreviousWord = () => {
    setWord(word - 1 < 0 ? 0 : word - 1)
  }

  const handleOpenNextWord = () => {
    if (!section) return
    setWord(word + 1 >= section?.words.length - 1 ? section?.words.length - 1 : word + 1)

    if (word + 1 >= section?.words.length) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <ConfettiContainer isVisible={isModalOpen} />
      <Container className={styles.container}>
        {isLoading && <Loader dimensionClass="!static lg:!relative" />}

        {error && (
          <div className="flex items-center justify-center flex-col h-[calc(100vh-201px-73px-32px)] sm:min-h-[calc(100vh-193px-81px-32px)] md:min-h-[calc(100vh-153px-81px-32px)] lg:h-full">
            <H3 className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_data')}</H3>
            <NavigationLink
              className="flex font-medium items-center justify-center bg-blue-200 text-white-100 px-3 py-1.5 rounded transition-all ease-in-out duration-300 lg:hover:bg-purple-100"
              href={`/dashboard/lists/${id}`}
            >
              {t('back_to_lists')}
            </NavigationLink>
          </div>
        )}
        {section && (
          <>
            <div className={styles.switcher}>
              <Button
                className={twMerge(styles.btn, 'dark:!bg-[#1D2D4D] dark:!text-grey-600 dark:lg:hover:!bg-purple-100')}
                onClick={handleOpenPreviousWord}
              >
                <IoIosArrowBack size={20} />
              </Button>
              <Button
                className={twMerge(styles.btn, 'dark:!bg-[#1D2D4D] dark:!text-grey-600 dark:lg:hover:!bg-purple-100')}
                onClick={handleOpenNextWord}
              >
                <IoIosArrowForward size={20} />
              </Button>
            </div>

            <WordCard
              word={word > section.words.length - 1 ? section?.words[section.words.length - 1] : section?.words[word]}
            />

            <Modal
              isOpen={isModalOpen}
              handleClose={() => setIsModalOpen(false)}
              className="dark:bg-[#0B152E]"
              successModal
            >
              <div className="flex flex-col-reverse h-full">
                <div className="flex flex-col h-full w-full justify-between mb-10">
                  <div>
                    <div className="flex flex-col gap-4">
                      <H3 className="text-[30px] text-blue-200 font-bold text-center sm:text-2xl md:text-3xl">
                        {t('congrats')}
                      </H3>
                      <P className="text-base text-[18px] font-medium sm:text-start md:text-lg">
                        {t('you_learned', {
                          words: section?.words.length,
                          list: locale === 'en' ? section?.sectionTitle : section?.sectionTitleUa
                        })}
                      </P>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <NavigationLink
                      className="rounded bg-blue-200 px-5 py-2 font-bold text-center w-[140px] transition-all ease-out duration-150 text-white-200 hover:bg-purple-100"
                      href={`/dashboard/flashcard/list/${id}/section/${sectionId}`}
                    >
                      {t('to_flashcards')}
                    </NavigationLink>
                    <NavigationLink
                      className="rounded border border-white border-solid bg-transparent text-center px-5 py-2 font-bold w-[140px] transition-all ease-out duration-150 hover:bg-purple-100 hover:border-purple-100"
                      href="/dashboard/lists"
                    >
                      {t('leave')}
                    </NavigationLink>
                  </div>
                </div>
                <div className="flex items-center justify-center my-6">
                  <Image src={finishImage} alt="finish" height={215} className="ml-4 lg:ml-0" />
                </div>
              </div>
            </Modal>
          </>
        )}
      </Container>
    </>
  )
}
