'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './Accordion.module.scss'
import { DFAQ } from '@/mock/FAQ.mock'
import { H6, P } from '@/components/ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'

import { IoIosArrowDown } from 'react-icons/io'

export default function Accordion() {
  const t = useTranslations('Mobile_app')
  const [open, setOpen] = useState(-1)

  const toggleAccordion = (id: number) => {
    setOpen(open === id ? -1 : id)
  }

  return (
    <>
      {DFAQ.map((item, i) => {
        return (
          <div
            key={item.id}
            className={`${styles.accordion} dark:text-grey-600 dark:bg-[#111C38] dark:lg:hover:bg-[#111C38]  ${
              open === i && `${styles.active}`
            } `}
            onClick={() => toggleAccordion(i)}
          >
            <div>
              <H6
                className={twMerge(
                  'text-base font-medium mb-0 max-w-[calc(100%-20px)]',
                  `${open === i && 'text-purple-100'}`
                )}
              >
                {t(item.question)}
              </H6>
              <IoIosArrowDown size={20} />
            </div>

            {i === open && <P className="text-sm text-grey-500 mt-4">{t(item.answer)}</P>}
          </div>
        )
      })}
    </>
  )
}
