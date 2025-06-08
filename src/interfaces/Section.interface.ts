import mongoose, { Schema } from 'mongoose'
import { IWord } from './Word.interface'

export interface ISection {
  _id: string
  sectionTitle: string
  sectionTitleUa: string
  words: Array<IWord>
  isBookmarked?: boolean
  bookmarkId?: string
}

export const sectionSchema = new Schema({
  sectionTitle: {
    type: String,
    required: true
  },
  sectionTitleUa: {
    type: String,
    required: true
  },
  words: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DefaultWords',
      required: true
    }
  ]
})

const Sections = mongoose.models.Sections || mongoose.model('Sections', sectionSchema)
export default Sections
