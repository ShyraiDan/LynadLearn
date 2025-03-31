'use client'

import styles from './LearnCategoryPage.module.scss'
import { WordCard } from '@/components/WordCard/WordCard'
import Button from '@/components/ui/Button/Button'
import { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { getSectionById } from '@/lib/sections'
import { ISection } from '@/interfaces/Section.interface'
import Container from '@/components/ui/Container/Container'
import { Modal } from '@/components/ui/Modal/Modal'
import { useTranslations } from 'next-intl'
import { H3, P } from '@/components/ui/Typography/Typography'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { ConfettiContainer } from '@/HOC/ConfettiContainer'

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import finishImage from '@/assets/finish.png'

//TODO:
// add loader and message when no list found

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
  const [section, setSection] = useState<ISection | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations('dashboard.lists')

  useEffect(() => {
    getSectionById(sectionId).then((data) => setSection(data))
  }, [sectionId])

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

            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} className="dark:bg-[#0B152E]">
              <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 h-full">
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
                      className="rounded bg-blue-200 px-5 py-2 font-bold text-center w-[140px] transition-all ease-out duration-150 hover:bg-purple-100"
                      href={`/dashboard/flashcard/list/${id}/section/${sectionId}`}
                    >
                      To flashcards
                    </NavigationLink>
                    <NavigationLink
                      className="rounded border border-white border-solid bg-transparent text-center px-5 py-2 font-bold w-[140px] transition-all ease-out duration-150 hover:bg-purple-100 hover:border-purple-100"
                      href="/dashboard/lists"
                    >
                      Leave
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
