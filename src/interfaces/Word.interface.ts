import mongoose, { Schema } from 'mongoose'

export interface IWord {
  _id: string
  word: string
  part_of_speech: string
  definition?: string
  translation: string
  pronunciation?: string
  example?: string
}
const wordsSchema = new Schema(
  {
    word: {
      type: String,
      required: true
    },
    definition: String,
    example: String,
    part_of_speech: {
      type: String,
      required: true
    },
    translation: {
      type: String,
      required: true
    },
    pronunciation: String
  },
  {
    timestamps: true
  }
)

const Word = mongoose.models.Words || mongoose.model('Words', wordsSchema)
export default Word
