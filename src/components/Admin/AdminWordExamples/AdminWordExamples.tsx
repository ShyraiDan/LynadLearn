import styles from './AdminWordExamples.module.scss'
import { twMerge } from 'tailwind-merge'
import { H3, P } from '@/components/ui/Typography/Typography'
import { Spring } from '@/components/ui/Spring/Spring'

import { MessageQuestion } from '@/components/ui/Icons/Icons'

export const AdminWordExamples = ({ examples }: { examples: Array<string> }) => {
  return (
    <div className={twMerge(styles['examples-container'], 'dark:!bg-[#1D2D4D]')}>
      <Spring right="1rem" />
      <Spring right="3rem" />
      <Spring left="1rem" />
      <Spring left="3rem" />
      <div className={styles.examples}>
        <div className={styles['examples-header']}>
          <div className={styles.title}>
            <MessageQuestion className="dark:fill-grey-600" />
            <H3 className="m-0 text-base sm:text-lg">Example</H3>
          </div>
        </div>
        <ul className={styles.content}>
          {examples.map((item: string, index: number) => (
            <li key={index}>
              <span className={styles.dot}></span>
              <P className="first-letter:uppercase">{item}</P>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
