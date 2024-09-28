import { DWords } from '@/mock/Words.mock'
import styles from './DictionaryWord.module.scss'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import { Button } from '@/components/ui/Button/Button'
import Image from 'next/image'

import us from '@/assets/icons/us.svg'
import example from '@/assets/icons/message-question.svg'

interface IDictionaryWordPage {
  params: { id: string }
}

export default function DictionaryWordPage({ params }: IDictionaryWordPage) {
  const { id } = params

  const word = DWords[0]

  const partsOfSpeech = word.results.reduce(
    (acc: { [key: string]: number }, { part_of_speech }) => ({
      ...acc,
      [part_of_speech]: (acc[part_of_speech] || 0) + 1
    }),
    {}
  )

  const synonyms = new Set(word.results.flatMap(({ synonyms }) => synonyms))

  return (
    <div className={styles.container}>
      <div className={styles['col-1']}>
        <div>
          <div className={styles.word}>
            <div className={styles.heading}>
              <div className={styles['word-section']}>{word.word}</div>
              <div className={styles.btns}></div>
            </div>
            <div className={styles.translation}>
              <Image src={us} alt='us' className={styles.flag} />/{word.pronunciation}/
            </div>
          </div>
          <div className={styles['lang-parts']}>
            {Object.entries(partsOfSpeech).map(([partOfSpeech, count]) => (
              <Button key={partOfSpeech}>
                {partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)} ({count})
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.meanings}>
          <div className={styles['meaning-header']}>
            <h6 className={styles.title}>{word.word}</h6>
          </div>
          <div className={styles['meaning-content']}>
            <div>
              <div className={styles.content}>
                <div className={styles.meaning}>
                  <div className={styles.number}>01</div>
                  <p>used with a number to show that it is not exact</p>
                </div>
                <div className={styles.synonyms}>
                  <Button>approximately</Button>
                </div>
              </div>
              <div className={styles.exams}>
                <WordExamples examples={word.results[0].examples} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['col-2']}>
        <WordExamples examples={word.results[0].examples} />
        <div className={styles.examples}>
          <div className={styles['examples-header']}>
            <div className={styles.title}>
              <Image src={example} alt='example' />
              <h3>Близькі Слова</h3>
            </div>
          </div>
          <ul className={styles.synonyms}>
            {Array.from(synonyms).map((item: string, index: number, i) => (
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
