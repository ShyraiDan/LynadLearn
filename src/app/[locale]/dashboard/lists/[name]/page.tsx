'use client'

import styles from './SingleList.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import VocabularyHeading from '@/components/PageHeading/PageHeading'

import { FaClock, FaBookmark, FaRegBookmark } from 'react-icons/fa6'
import subcategoryUnselected from '@/assets/subcategory-unselected.svg'
import subcategorySelected from '@/assets/subcategory-selected.svg'
import { BsGridFill } from 'react-icons/bs'
import note from '@/assets/icons/note-2-disable.svg'
import { FaArrowRight } from 'react-icons/fa'

export default function SingleDefaultList({ params }: any) {
  const { name, id } = params
  const [isSelected, setIsSelected] = useState(true)
  const [isPinned, setIsPinned] = useState(false)
  console.log('params', params)

  const handlePin = (e: any) => {
    e.stopPropagation()
    setIsPinned(!isPinned)
  }

  return (
    <div className={styles.container}>
      <VocabularyHeading name={name} id={id} />
      <div className={styles.lessons}>
        <div>
          <div className={styles['lesson-item']}>
            <div className={`${isSelected && styles.opened}`}>
              <div className={styles['icon-number']}>
                <Image src={isSelected ? subcategorySelected : subcategoryUnselected} alt='' className={styles.icon} />
                <div className={styles.number}>01</div>
              </div>
              <div className={styles['accordion-wrapper']}>
                <div className={styles['accordion']}>
                  <div
                    className={`${styles['accordion-summary']} ${isSelected && styles.active}`}
                    onClick={() => setIsSelected(!isSelected)}>
                    <div>
                      <h3>Top 1 - 25 Verbs</h3>
                    </div>
                  </div>

                  {isSelected && (
                    <div className={styles['accordion-details']}>
                      <div className={styles['accordion-details-container']}>
                        <div className={styles.btns}>
                          <Button className={styles['tip-btn']} onClick={handlePin}>
                            {isPinned ? <FaBookmark /> : <FaRegBookmark />}
                          </Button>
                          <NavigationLink href='/'>
                            <BsGridFill />
                          </NavigationLink>
                        </div>
                        <div className={styles.info}>
                          <div>
                            <div>
                              <Image src={note} alt='' />
                              25 words
                            </div>
                            <div>
                              <FaClock size={20} />
                              13 m
                            </div>
                          </div>

                          <NavigationLink href={`/dashboard/lists/${name}/learn`}>
                            Start <FaArrowRight />
                          </NavigationLink>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
