import mongoose, { Schema } from 'mongoose'

export interface IGrammarTopic {
  _id: string
  level: string
  title: string
  titleUa: string
  data: {
    description: Array<string>
    example: Array<{
      title: string
      description: string
      examples: Array<string>
    }>
  }
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
  data: {
    description: Array<String>,
    example: Array<{
      title: String
      description: String
      examples: Array<String>
    }>
  }
})

const Grammar = mongoose.models.Grammars || mongoose.model('Grammars', grammarSchema)
export default Grammar
