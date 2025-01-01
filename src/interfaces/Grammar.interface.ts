import mongoose, { Schema } from 'mongoose'

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
  quizId: string
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
    description: Array<String>,
    example: Array<{
      title: String
      description: String
      examples: Array<String>
    }>
  },
  quizId: {
    type: String
  }
})

const Grammar = mongoose.models.Grammars || mongoose.model('Grammars', grammarSchema)
export default Grammar
