import styles from './DictionaryCard.module.scss'
import Image from 'next/image'
import { IWord } from '@/interfaces/Word.interface'

import ua from '@/assets/icons/uk.png'

interface IDictionaryCard {
  word: IWord
}

const DictionaryCard = ({ word }: IDictionaryCard) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h5>{word.word}</h5>
          <div className={styles.translation}>
            <Image src={ua} alt='ua' className={styles.flag} />
            <p>{word.translation.ua[0]}</p>
          </div>
        </div>
        <h6>[{word.results[0].part_of_speech}]</h6>
      </div>
    </div>
  )
}
export default DictionaryCard
