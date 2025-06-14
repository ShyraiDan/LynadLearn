import mongoose, { Schema } from 'mongoose'
import { IQuestion } from './Quiz.interface'

export interface IGrammarTopic {
  _id: string
  level: string
  title: string
  titleUa: string
  data: {
    description: { id: string; en: string; ua: string }[]
    example: Array<{
      title: string
      titleUa: string
      description: string
      descriptionUa: string
      examples: IGrammarExample[]
    }>
  }
  questions: IQuestion[]
  isBookmarked?: boolean
  bookmarkId?: string
}

export interface IGrammarExample {
  exampleEn: string
  exampleUa: string
}

const grammarSchema = new Schema({
  level: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  titleUa: {
    type: String,
    required: true
  },
  data: {
    description: Array<string>,
    example: Array<{
      title: string
      description: string
      examples: Array<string>
    }>
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          _id: {
            type: String,
            required: true
          },
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

const Grammar = mongoose.models.Grammars || mongoose.model('Grammars', grammarSchema)
export default Grammar
