import styles from './WordCard.module.scss'
import Image from 'next/image'
import { Spring } from './components/Spring/Spring'
import { Button } from '../ui/Button/Button'
import { useTranslations } from 'next-intl'

import example from '@/assets/icons/message-question.svg'
import usFlag from '@/assets/icons/us.svg'
import { FaPlus } from 'react-icons/fa'

export const WordCard = ({ word }: { word: any }) => {
  const t = useTranslations('dashboard.lists.learn')

  return (
    <div className={styles['word-card']}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.word}>{word.word}</div>
          <div className={styles.btns}>
            <Button className={styles.btn}>
              <FaPlus size={20} />
            </Button>
          </div>
        </div>
        <div className={styles.pronunciation}>
          <Image src={usFlag} alt='flag' width={24} />
          <h6>{word.pronunciation}</h6>
        </div>
        <div className={styles['part-of-speech']}>{word.part_of_speech}</div>
        <p>{word.definition}</p>
      </div>
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
            {word.examples.map((item: string, index: number) => (
              <li key={index}>
                <span className={styles.dot}></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
