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
