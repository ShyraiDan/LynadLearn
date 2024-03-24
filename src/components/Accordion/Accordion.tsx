'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './Accordion.module.scss'
import { DFAQ } from '@/mock/FAQ.mock'

import { IoIosArrowDown } from 'react-icons/io'

export default function Accordion() {
  const t = useTranslations('Mobile_app')
  const [open, setOpen] = useState(-1)

  const toggleAccordion = (id: number) => {
    open === id ? setOpen(-1) : setOpen(id)
  }

  return (
    <>
      {DFAQ.map((item, i) => {
        return (
          <div
            key={item.id}
            className={`${styles.accordion} ${open === i && styles.active}`}
            onClick={() => toggleAccordion(i)}>
            <div>
              <h6>{t(item.question)}</h6>
              <IoIosArrowDown size={20} />
            </div>

            {i === open && <p>{t(item.answer)}</p>}
          </div>
        )
      })}
    </>
  )
}
