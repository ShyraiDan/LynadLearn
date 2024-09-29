import styles from './MeaningCard.module.scss'
import { IWord } from '@/interfaces/Word.interface'
import { Button } from '../ui/Button/Button'
import { WordExamples } from '../WordExamples/WordExamples'

interface IMeaningCard {
  word: IWord
}

interface Result {
  definition: string
  part_of_speech: string
  examples: string[]
  synonyms: string[]
  category: string[]
  level: string
}

export const MeaningCard = ({ word }: IMeaningCard) => {
  const groupByPartOfSpeech = (wordData: IWord) => {
    return wordData.results.reduce((acc: { [key: string]: Result[] }, result) => {
      const partOfSpeech = result.part_of_speech
      if (!acc[partOfSpeech]) {
        acc[partOfSpeech] = []
      }
      acc[partOfSpeech].push(result)
      return acc
    }, {})
  }

  const meanings = groupByPartOfSpeech(word)

  return (
    <>
      {Object.entries(meanings).map(([partOfSpeech, results]) => (
        <div className={styles.meanings} key={partOfSpeech}>
          <div className={styles['meaning-header']}>
            <h6 className={styles.title}>{word.word}</h6>
            <div className={`${styles.badge} ${styles[partOfSpeech]}`}>{partOfSpeech}</div>
          </div>
          {results.map((result, index) => (
            <div className={`${styles['meaning-content']} ${index !== 0 && 'rounded-3xl'}`} key={index}>
              <div>
                <div className={styles.content}>
                  <div className={styles.meaning}>
                    <div className={styles.number}>{index + 1}</div>
                    <p>{result.definition}</p>
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
