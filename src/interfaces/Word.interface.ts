import mongoose, { Schema } from 'mongoose'

export interface IDefinition {
  definition: string
  part_of_speech: string
  examples: Array<string>
  synonyms: Array<string>
  category: Array<string>
  level: string
}

export interface IDefinitionWithId extends IDefinition {
  id: string
}

export interface IWord {
  _id?: string
  word: string
  results: Array<IDefinition>
  pronunciation?: string
  translation: {
    ua: Array<string>
  }
  listId?: string
}
const wordsSchema = new Schema(
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
    listId: {
      type: Schema.Types.ObjectId,
      ref: 'List',
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
