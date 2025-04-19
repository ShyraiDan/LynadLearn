import mongoose, { Schema } from 'mongoose'

export interface IBookmarks {
  _id: string
  titleEn: string
  titleUa: string
  url: string
  userId: string
  image?: string
  descriptionEn?: string
  descriptionUa?: string
}

export interface IAddBookmark {
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
  userId: {
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

const Bookmarks = mongoose.models.Bookmarks || mongoose.model('Bookmarks', bookmarksSchema)
export default Bookmarks
