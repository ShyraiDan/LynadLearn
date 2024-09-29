import Image from 'next/image'
import example from '@/assets/icons/message-question.svg'
import styles from './WordExamples.module.scss'
import { useTranslations } from 'next-intl'

import { Spring } from '@/components/ui/Spring/Spring'

export const WordExamples = ({ examples }: { examples: Array<string> }) => {
  const t = useTranslations('dashboard.lists.learn')

  return (
    <div className={styles['examples-container']}>
      <Spring right='1rem' />
      <Spring right='3rem' />
      <Spring left='1rem' />
      <Spring left='3rem' />
      <div className={styles.examples}>
        <div className={styles['examples-header']}>
          <div className={styles.title}>
            <Image src={example} alt='example' />
            <h3>{t('example')}</h3>
          </div>
        </div>
        <ul className={styles.content}>
          {examples.map((item: string, index: number, i) => (
            <li key={index}>
              <span className={styles.dot}></span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
