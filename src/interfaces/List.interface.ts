import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import mongoose, { Schema } from 'mongoose'
import { IWord } from './Word.interface'

export interface IList {
  _id: string
  title: string
  image?: string | StaticImport | undefined
  words: Array<IWord>
}

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    avatarUrl: String,
    words: {
      type: [Schema.Types.ObjectId],
      ref: 'Word'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const List = mongoose.models.Lists || mongoose.model('Lists', listSchema)
export default List
