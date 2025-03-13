import mongoose, { Schema } from 'mongoose'
import { IDefinition } from './Word.interface'

export interface IDefaultWord {
  _id?: string
  word: string
  results: Array<IDefinition>
  pronunciation?: string
  translation: {
    ua: Array<string>
  }
  listId?: string
  common_adverb?: number
  common_noun?: number
  common_verb?: number
  common_adjective?: number
  common_phrase?: number
}

const defaultWordsSchema = new Schema(
  {
    word: {
      type: String,
      required: true
    },
    results: [
      new Schema(
        {
          definition: String,
          part_of_speech: String,
          examples: [String],
          synonyms: [String],
          category: [String],
          level: String
        },
        { _id: false }
      )
    ],
    translation: {
      ua: {
        type: Array<string>,
        required: true
      }
    },
    pronunciation: String,
    common_adverb: Number,
    common_noun: Number,
    common_verb: Number,
    common_adjective: Number,
    common_phrase: Number
  },
  {
    timestamps: true
  }
)

const DefaultWords = mongoose.models.DefaultWords || mongoose.model('DefaultWords', defaultWordsSchema)
export default DefaultWords
