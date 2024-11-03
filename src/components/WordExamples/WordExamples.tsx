import Image from 'next/image'
import styles from './WordExamples.module.scss'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

import { MessageQuestion } from '../ui/Icons/Icons'
import { Spring } from '@/components/ui/Spring/Spring'

export const WordExamples = ({ examples }: { examples: Array<string> }) => {
  const t = useTranslations('dashboard.lists.learn')

  return (
    <div className={twMerge(styles['examples-container'], 'dark:!bg-[#1D2D4D]')}>
      <Spring right='1rem' />
      <Spring right='3rem' />
      <Spring left='1rem' />
      <Spring left='3rem' />
      <div className={styles.examples}>
        <div className={styles['examples-header']}>
          <div className={styles.title}>
            <MessageQuestion className='dark:fill-grey-600' />
            <h3 className='dark:text-grey-600'>{t('example')}</h3>
          </div>
        </div>
        <ul className={styles.content}>
          {examples.map((item: string, index: number, i) => (
            <li key={index}>
              <span className={styles.dot}></span>
              <p className='dark:text-grey-600'>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
