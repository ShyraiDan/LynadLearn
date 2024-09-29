import { DWords } from '@/mock/Words.mock'
import styles from './DictionaryWord.module.scss'
import { WordExamples } from '@/components/WordExamples/WordExamples'
import { Button } from '@/components/ui/Button/Button'
import Image from 'next/image'
import { MeaningCard } from '@/components/MeaningCard/MeaningCard'
import { useTranslations } from 'next-intl'

import us from '@/assets/icons/us.svg'
import example from '@/assets/icons/message-question.svg'

interface IDictionaryWordPage {
  params: { id: string }
}

export default function DictionaryWordPage({ params }: IDictionaryWordPage) {
  const { id } = params
  const t = useTranslations('Dictionary')

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

        <MeaningCard word={word} />
      </div>
      <div className={styles['col-2']}>
        <WordExamples examples={word.results[0].examples} />
        <div className={styles.examples}>
          <div className={styles['examples-header']}>
            <div className={styles.title}>
              <Image src={example} alt='example' />
              <h3>{t('nearby_words')}</h3>
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
