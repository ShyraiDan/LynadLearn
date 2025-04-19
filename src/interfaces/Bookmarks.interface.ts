import mongoose, { Schema } from 'mongoose'

export interface IBookmarks {
  id: string
  titleEn: string
  titleUa: string
  url: string
  image?: string
  descriptionEn?: string
  descriptionUa?: string
}

const bookmarksSchema = new Schema({
  titleUa: {
    type: String,
    required: true
  },
  titleEn: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  descriptionEn: {
    type: String
  },
  descriptionUa: {
    type: String
  }
})

const Bookmarks = mongoose.models.Achievements || mongoose.model('Bookmarks', bookmarksSchema)
export default Bookmarks
