// import mongoose, { Schema, ObjectId } from 'mongoose'

// export interface IQuiz {
//   _id: ObjectId
//   title: string
//   questions: IQuestion[]
// }

export interface IQuestion {
  question: string
  options: IQuizOption[]
}

export interface IVocabularyQuestion {
  question: {
    en: string
    ua: string
  }
  options: IQuizOption[]
}

export interface IVocabularyQuiz {
  title: string
  titleUa: string
  questions: IVocabularyQuestion[]
}

export type IQuizOption = {
  _id?: string
  option: string
  correct: boolean
}
