import { ScoresEnum } from '@/lib/scores'

export const calculateUserScores = (
  amount: number,
  type: 'quiz' | 'flashcard' | 'word' | 'list',
  extra: boolean
): number => {
  switch (type) {
    case 'quiz':
      return amount * ScoresEnum.ANSWER_QUIZ + (extra ? ScoresEnum.FINISH_QUIZ : 0)
    case 'flashcard':
      return amount * ScoresEnum.FLASHCARD
    case 'word':
      return amount * ScoresEnum.ADD_WORD
    case 'list':
      return amount * ScoresEnum.CREATE_LIST
  }
}
