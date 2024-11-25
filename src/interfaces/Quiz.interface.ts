import mongoose, { Schema } from 'mongoose'

export interface IQuiz {
  title: string
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  options: {
    _id?: string
    option: string
    correct: boolean
  }[]
}

export interface IVocabularyQuestion {
  question: {
    en: string
    ua: string
  }
  options: {
    _id?: string
    option: string
    correct: boolean
  }[]
}

export interface IVocabularyQuiz {
  title: string
  questions: IVocabularyQuestion[]
}

const quizzesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          option: {
            type: String,
            required: true
          },
          correct: {
            type: Boolean,
            required: true
          }
        }
      ]
    }
  ]
})

const Quizzes = mongoose.models.Quizzes || mongoose.model('Quizzes', quizzesSchema)
export default Quizzes
