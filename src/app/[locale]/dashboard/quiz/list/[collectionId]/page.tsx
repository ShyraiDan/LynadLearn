'use client'

import styles from './SingleList.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useState, MouseEvent, useEffect } from 'react'
import Button from '@/components/ui/Button/Button'
import PageHeading from '@/components/PageHeading/PageHeading'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import Container from '@/components/ui/Container/Container'
import useSWR, { mutate } from 'swr'
import { ICollections } from '@/interfaces/Collections.interface'
import { H3 } from '@/components/ui/Typography/Typography'
import { fetcher } from '@/utils/fetcher'
import Loader from '@/components/Loader/Loader'
import { addBookmark, removeBookmark } from '@/lib/bookmark'
import { toast } from 'sonner'
import { getSession, ISession } from '@/lib/auth'
import { ISection } from '@/interfaces/Section.interface'
import { findBookmarkType } from '@/utils/findBookmarkType'

import { FaClock, FaBookmark, FaRegBookmark } from 'react-icons/fa6'
import subcategoryUnselected from '@/assets/subcategory-unselected.svg'
import subcategorySelected from '@/assets/subcategory-selected.svg'
import note from '@/assets/icons/note-2-disable.svg'
import { FaArrowRight } from 'react-icons/fa'

interface SingleDefaultListProps {
  params: {
    collectionId: string
    locale: string
  }
}

export default function SingleDefaultList({ params }: SingleDefaultListProps) {
  const { locale, collectionId } = params
  const [session, setSession] = useState<ISession>()
  const t = useTranslations('dashboard.quiz')
  const [isSelected, setIsSelected] = useState(0)
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])

  const {
    data: collection,
    isLoading,
    error
  } = useSWR<ICollections>(`/api/collection/${collectionId}?activityType=quiz`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false
  })

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })
  }, [])

  useEffect(() => {
    setBookmarkedItems(
      collection?.sections.filter((item: ISection) => item.isBookmarked).map((item: ISection) => item._id) || []
    )
  }, [collection])

  const handlePin = async (item: ISection, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (session?.userId) {
      if (!bookmarkedItems.includes(item._id)) {
        const redirectLink = `/dashboard/quiz/lists/${collectionId}/section/${item._id}`

        const itemType = findBookmarkType(redirectLink.split('/')[2])

        const bookmarkItem = {
          titleEn: item.sectionTitle,
          titleUa: item.sectionTitleUa,
          url: redirectLink,
          image: '',
          itemId: item._id,
          itemType: itemType,
          descriptionEn: '',
          descriptionUa: ''
        }

        const result = await addBookmark(session?.userId, bookmarkItem)

        if (result.success) {
          toast.success(t('successfully_add_bookmark'), {
            duration: 3000,
            className: 'border border-green-100 bg-green-100 text-white-100'
          })

          mutate(`/api/collection/${collectionId}?activityType=quiz`)
        } else {
          toast.error(t('error_add_bookmark'), {
            duration: 3000,
            className: 'border text-white-100 border-red bg-red'
          })
        }
      } else {
        if (!item.bookmarkId) {
          toast.error(t('error_remove_bookmark'), {
            duration: 3000,
            className: 'border text-white-100 border-red bg-red'
          })

          return
        }

        const result = await removeBookmark(item.bookmarkId)

        if (result.success) {
          toast.success(t('successfully_remove_bookmark'), {
            duration: 3000,
            className: 'border border-green-100 bg-green-100 text-white-100'
          })

          // setBookmarkedItems((state) => state.filter((id) => id !== item._id))

          mutate(`/api/collection/${collectionId}?activityType=quiz`)
        } else {
          toast.error(t('error_remove_bookmark'), {
            duration: 3000,
            className: 'border text-white-100 border-red bg-red'
          })
        }
      }
    }
  }

  return (
    <Container className={styles.container}>
      {isLoading && <Loader dimensionClass="!static lg:!relative" />}
      {(error || collection?.sections.length === 0) && (
        <div className="flex items-center justify-center flex-col h-[calc(100vh-201px-73px-32px)] sm:min-h-[calc(100vh-193px-81px-32px)] md:min-h-[calc(100vh-153px-81px-32px)] lg:h-full">
          <H3 className="text-center text-lg font-bold text-blue-200 mb-2 sm:text-[2rem] sm:mb-4">{t('no_data')}</H3>
          <NavigationLink
            className="flex font-medium items-center justify-center bg-blue-200 text-white-100 px-3 py-1.5 rounded transition-all ease-in-out duration-300 lg:hover:bg-purple-100"
            href="/dashboard/quiz/vocabulary"
          >
            {t('move_to_quizzes')}
          </NavigationLink>
        </div>
      )}
      {collection && (
        <>
          <PageHeading
            title={locale === 'en' ? collection.title : collection.titleUa}
            description={locale === 'en' ? collection.description : collection.descriptionUa}
            image={collection.image}
          />
          <div className={styles.lessons}>
            <div>
              {collection.sections.map((section, i) => (
                <>
                  <div className={styles['lesson-item']} key={i}>
                    <div className={`${isSelected === i && styles.opened}`}>
                      <div className={styles['icon-number']}>
                        <Image
                          src={isSelected === i ? subcategorySelected : subcategoryUnselected}
                          alt="Subcategory icon"
                          className={styles.icon}
                        />
                        <div className={styles.number}>{i + 1 > 9 ? i + 1 : `0${i + 1}`}</div>
                      </div>
                      <div className={styles['accordion-wrapper']}>
                        <div className={twMerge(styles['accordion'])}>
                          <div
                            className={twMerge(
                              styles['accordion-summary'],
                              isSelected === i && styles.active,
                              'dark:!bg-[#19274a]'
                            )}
                            onClick={() => setIsSelected(i)}
                          >
                            <div>
                              <H3 className="dark:text-grey-600">
                                {locale === 'en' ? section.sectionTitle : section.sectionTitleUa}
                              </H3>
                            </div>
                          </div>

                          {isSelected === i && (
                            <div className={styles['accordion-details']}>
                              <div className={twMerge(styles['accordion-details-container'], 'dark:!bg-[#1D2D4D]')}>
                                <div className={styles.btns}>
                                  <Button className={styles['tip-btn']} onClick={(e) => handlePin(section, e)}>
                                    {bookmarkedItems.includes(section._id) ? (
                                      <FaBookmark className="dark:text-grey-600 dark:lg:hover:text-purple-100" />
                                    ) : (
                                      <FaRegBookmark className="dark:text-grey-600 dark:lg:hover:text-purple-100" />
                                    )}
                                  </Button>
                                </div>
                                <div className={styles.info}>
                                  <div>
                                    <div>
                                      <Image src={note} alt="" />
                                      {section.words.length} {t('words')}
                                    </div>
                                    <div>
                                      <FaClock size={20} />
                                      {Math.floor(section.words.length / 60) > 1 && (
                                        <>
                                          {Math.floor(section.words.length / 60)} {t('hours')}
                                        </>
                                      )}
                                      {Math.ceil((section.words.length % 60) / 2)} {t('minutes')}
                                    </div>
                                  </div>

                                  <NavigationLink href={`/dashboard/quiz/list/${collectionId}/section/${section._id}`}>
                                    {t('start')} <FaArrowRight />
                                  </NavigationLink>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
