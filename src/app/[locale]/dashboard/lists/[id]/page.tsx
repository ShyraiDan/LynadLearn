'use client'

import styles from './SingleList.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useState, MouseEvent, useEffect } from 'react'
import Button from '@/components/ui/Button/Button'
import PageHeading from '@/components/PageHeading/PageHeading'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { getCookies } from '@/utils/cookies'
import { RequireAuthModal } from '@/components/RequireAuthModal/RequireAuthModal'
import { getCollectionById } from '@/lib/collections'
import { ICollections } from '@/interfaces/Collections.interface'
import Container from '@/components/ui/Container/Container'

import { FaClock, FaBookmark, FaRegBookmark } from 'react-icons/fa6'
import subcategoryUnselected from '@/assets/subcategory-unselected.svg'
import subcategorySelected from '@/assets/subcategory-selected.svg'
import { BsGridFill } from 'react-icons/bs'
import note from '@/assets/icons/note-2-disable.svg'
import { FaArrowRight } from 'react-icons/fa'
import { removeScrollBar } from '@/constants/shared'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { H3, H6 } from '@/components/ui/Typography/Typography'

interface SingleDefaultListProps {
  params: {
    locale: string
    id: string
  }
}

//TODO:
// add loader and message when no list found

export default function SingleDefaultList({ params }: SingleDefaultListProps) {
  const { locale, id } = params
  const [collection, setCollection] = useState<ICollections | null>(null)

  useEffect(() => {
    getCollectionById(id).then((data) => setCollection(data))
  }, [id])

  const t = useTranslations('dashboard.lists.learn')
  const [isSelected, setIsSelected] = useState(0)
  const [isAuthRequireModal, setAuthRequireModal] = useState(false)
  const [isAuthModal, setAuthModal] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  const handlePin = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const cookies = getCookies()

    if (cookies['lama-session']) {
      setIsPinned(!isPinned)
    } else {
      setAuthRequireModal(true)
      removeScrollBar(isAuthRequireModal)
    }
  }

  const handleClose = () => {
    setAuthRequireModal(false)
    removeScrollBar(isAuthRequireModal)
  }

  return (
    <Container className={styles.container}>
      {!collection && <div>Collection not found</div>}

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
                          alt=""
                          className={styles.icon}
                        />
                        <div className={styles.number}>{i + 1 > 10 ? i + 1 : `0${i + 1}`}</div>
                      </div>
                      <div className={styles['accordion-wrapper']}>
                        <div className={styles.accordion}>
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
                                  <Button className={styles['tip-btn']} onClick={(e) => handlePin(e)}>
                                    {isPinned ? (
                                      <FaBookmark className="dark:text-grey-600 dark:lg:hover:text-purple-100" />
                                    ) : (
                                      <FaRegBookmark className="dark:text-grey-600 dark:lg:hover:text-purple-100" />
                                    )}
                                  </Button>
                                  <NavigationLink href="/">
                                    <BsGridFill />
                                  </NavigationLink>
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

                                  <NavigationLink href={`/dashboard/lists/${id}/learn/${section._id}`}>
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

      <RequireAuthModal
        isOpen={isAuthRequireModal}
        handleClose={handleClose}
        allowedAction={() => {
          setAuthModal(true)
          handleClose()
        }}
      >
        <H6 className="text-center font-bold">{t('need_auth')}</H6>
      </RequireAuthModal>

      <AuthModal isModalOpen={isAuthModal} showModal={() => setAuthModal((state) => !state)} />
    </Container>
  )
}
