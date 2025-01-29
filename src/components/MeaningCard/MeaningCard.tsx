import styles from './MeaningCard.module.scss'
import { IWord } from '@/interfaces/Word.interface'
import Button from '@/components/ui/Button/Button'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import { groupByPartOfSpeech } from '@/utils/middlewares'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/Badge/Badge'
import { twMerge } from 'tailwind-merge'

interface IMeaningCard {
  word: IWord
}

export const MeaningCard = ({ word }: IMeaningCard) => {
  const meanings = groupByPartOfSpeech(word)
  const t = useTranslations('Dictionary')

  return (
    <>
      {Object.entries(meanings).map(([partOfSpeech, results]) => (
        <div className={twMerge(styles.meanings, 'dark:!bg-[#16274A]')} key={partOfSpeech}>
          <div className={twMerge(styles['meaning-header'], 'dark:!bg-[#1D2D4D]')}>
            <h6 className={twMerge(styles.title, 'dark:text-grey-600')}>{word.word}</h6>
            <Badge part={partOfSpeech} />
          </div>
          {results.map((result, index) => (
            <div className={`${styles['meaning-content']} ${index !== 0 && 'rounded-3xl'}`} key={index}>
              <div>
                <div className={styles.content}>
                  <div className={styles.meaning}>
                    <div className={styles.number}>{index + 1}</div>
                    <p className="dark:text-grey-600">{result.definition}</p>
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
