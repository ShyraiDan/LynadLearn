import styles from './MeaningCard.module.scss'
import { IWord } from '@/interfaces/Word.interface'
import Button from '@/components/ui/Button/Button'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import { groupByPartOfSpeech } from '@/utils/middlewares'
import { Badge } from '@/components/Badge/Badge'
import { twMerge } from 'tailwind-merge'
import { H6, P } from '@/components/ui/Typography/Typography'

interface IMeaningCard {
  word: IWord
}

export const MeaningCard = ({ word }: IMeaningCard) => {
  const meanings = groupByPartOfSpeech(word)

  return (
    <>
      {Object.entries(meanings).map(([partOfSpeech, results]) => (
        <div className={twMerge(styles.meanings, 'dark:!bg-[#16274A]')} key={partOfSpeech}>
          <div className={twMerge(styles['meaning-header'], 'dark:!bg-[#1D2D4D]')}>
            <H6 className="font-medium text-lg md:text-2xl">{word.word}</H6>
            <Badge part={partOfSpeech} />
          </div>
          {results.map((result, index) => (
            <div className={`${styles['meaning-content']} ${index !== 0 && 'rounded-3xl'}`} key={index}>
              <div>
                <div className={styles.content}>
                  <div className={styles.meaning}>
                    <div className={styles.number}>{index + 1}</div>
                    <P className="ml-3 font-medium text-lg">{result.definition}</P>
                  </div>
                  <div className={styles.synonyms}>
                    {result.synonyms.map((synonym, i) => (
                      <Button key={i}>
                        <span>≈</span> {synonym}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className={styles.exams}>
                  <WordExamples examples={result.examples} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
