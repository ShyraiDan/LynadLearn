import mongoose, { Schema } from 'mongoose'
import { ISection } from './Section.interface'

export interface ICollections {
  _id: string
  type: string
  image: string
  title: string
  titleUa: string
  description: string
  descriptionUa: string
  lessons: number
  words: number
  sections: Array<ISection>
}

export const collectionsSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  image: {
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
  description: {
    type: String,
    required: true
  },
  descriptionUa: {
    type: String,
    required: true
  },
  lessons: {
    type: Number,
    required: true
  },
  words: {
    type: Number,
    required: true
  },
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sections',
      required: true
    }
  ]
})

const Collections = mongoose.models.Collections || mongoose.model('Collections', collectionsSchema)
export default Collections
