import styles from './DictionaryCard.module.scss'
import Image from 'next/image'
import { IWord } from '@/interfaces/Word.interface'
import { H5, P, H6 } from '@/components/ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'

import ua from '@/assets/icons/uk.png'

interface IDictionaryCard {
  word: IWord
}

const DictionaryCard = ({ word }: IDictionaryCard) => {
  return (
    <div className={twMerge(styles.card, 'dark:bg-[#18223D] dark:hover:bg-[#222e4b]')}>
      <div className={styles.container}>
        <div className={styles.info}>
          <H5 className="text-sm capitalize m-0 font-bold md:flex md:text-base">{word.word}</H5>
          <div className={styles.translation}>
            <Image src={ua} alt="ua" className={styles.flag} />
            <P>{word.translation.ua[0]}</P>
          </div>
          <P
            className="leading-5 cursor-text text-ellipsis overflow-hidden break-words m-0 text-sm 
          sm:text-base sm:leading-6 
          lg:text-lg lg:leading-7"
          >
            {word.results[0].definition}
          </P>
        </div>
        <H6 className="font-bold text-xs capitalize max-[320px]:text-[10px] max-[320px]:min-w-[65px] md:flex md:text-sm">
          [{word.results[0].part_of_speech}]
        </H6>
      </div>
    </div>
  )
}
export default DictionaryCard
