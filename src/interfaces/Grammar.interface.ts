import mongoose, { Schema } from 'mongoose'

export interface IGrammarTopic {
  _id: Schema.Types.ObjectId
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
  quizId: Schema.Types.ObjectId
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
    type: Schema.Types.ObjectId
  }
})

const Grammar = mongoose.models.Grammars || mongoose.model('Grammars', grammarSchema)
export default Grammar
