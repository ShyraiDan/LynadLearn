import styles from './WordCard.module.scss'
import Image from 'next/image'
import { Button } from '../ui/Button/Button'
import { WordExamples } from '../WordExamples/WordExamples'
import { IWord } from '@/interfaces/Word.interface'

import usFlag from '@/assets/icons/us.svg'
import { FaPlus } from 'react-icons/fa'

export const WordCard = ({ word }: { word: IWord }) => {
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
        <div className={styles['part-of-speech']}>{word.results[0].part_of_speech}</div>
        <p>{word.results[0].definition}</p>
      </div>
      <WordExamples examples={word.results[0].examples} />
    </div>
  )
}
