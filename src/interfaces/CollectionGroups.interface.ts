import { ICollections } from './Collections.interface'
import mongoose, { Schema } from 'mongoose'
import { collectionsSchema } from './Collections.interface'

export interface ICollectionsGroup {
  _id: string
  title: string
  titleUa: string
  description: string
  descriptionUa: string
  image: string
  collections: Array<ICollections>
}

const collectionGroupsSchema = new Schema({
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
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Collections',
      required: true
    }
  ]
})

const CollectionGroups = mongoose.models.CollectionGroups || mongoose.model('CollectionGroups', collectionGroupsSchema)
export default CollectionGroups
