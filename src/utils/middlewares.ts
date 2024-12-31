import { IWord } from '@/interfaces/Word.interface'

interface Result {
  definition: string
  part_of_speech: string
  examples: string[]
  synonyms: string[]
  category: string[]
  level: string
}

export const groupByPartOfSpeech = (wordData: IWord) => {
  return wordData.results.reduce((acc: { [key: string]: Result[] }, result) => {
    const partOfSpeech = result.part_of_speech
    if (!acc[partOfSpeech]) {
      acc[partOfSpeech] = []
    }
    acc[partOfSpeech].push(result)
    return acc
  }, {})
}

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
