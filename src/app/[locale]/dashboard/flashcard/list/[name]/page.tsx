'use client'

import styles from './SingleList.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useState, MouseEvent } from 'react'
import Button from '@/components/ui/Button/Button'
import PageHeading from '@/components/PageHeading/PageHeading'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

import { FaClock, FaBookmark, FaRegBookmark } from 'react-icons/fa6'
import subcategoryUnselected from '@/assets/subcategory-unselected.svg'
import subcategorySelected from '@/assets/subcategory-selected.svg'
import { BsGridFill } from 'react-icons/bs'
import note from '@/assets/icons/note-2-disable.svg'
import { FaArrowRight } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

const lessons = [1, 2, 3, 4, 5, 6]

type TSingleDefaultList = {
  params: {
    name: string
    locale: string
    from?: string
  }
}

//TODO:
// add loader and message when no list found

export default function SingleDefaultList({ params }: TSingleDefaultList) {
  const { name, locale } = params
  const t = useTranslations('dashboard.lists.learn')
  const [isSelected, setIsSelected] = useState(0)
  const [isPinned, setIsPinned] = useState(false)
  const words = 25

  const handlePin = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsPinned(!isPinned)
  }

  return (
    <div className={styles.container}>
      <PageHeading name={name} id="id" title="title" description="description" />
      <div className={styles.lessons}>
        <div>
          {lessons.map((item, i) => (
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
                          <h3 className="dark:text-grey-600">Top 1 - 25 Verbs</h3>
                        </div>
                      </div>

                      {isSelected === i && (
                        <div className={styles['accordion-details']}>
                          <div className={twMerge(styles['accordion-details-container'], 'dark:!bg-[#1D2D4D]')}>
                            <div className={styles.btns}>
                              <Button className={styles['tip-btn']} onClick={(e) => handlePin(e)}>
                                {isPinned ? (
                                  <FaBookmark className="dark:text-grey-600 dark:hover:text-purple-100" />
                                ) : (
                                  <FaRegBookmark className="dark:text-grey-600 dark:hover:text-purple-100" />
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
                                  {words} {t('words')}
                                </div>
                                <div>
                                  <FaClock size={20} />
                                  {Math.floor(words / 120) > 1 && (
                                    <>
                                      {Math.floor(words / 120)} {t('hours')}
                                    </>
                                  )}
                                  {Math.ceil((words % 60) / 2)} {t('minutes')}
                                </div>
                              </div>

                              <NavigationLink
                                href={`/dashboard/flashcard/list/${name}/collection/672f528184d114c2e4881f54`}
                              >
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
    </div>
  )
}
