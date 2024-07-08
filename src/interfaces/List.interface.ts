import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import mongoose, { Schema } from 'mongoose'

export interface IList {
  _id: string
  title: string
  image?: string | StaticImport | undefined
}

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    avatarUrl: String,
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
