import mongoose, { Schema } from 'mongoose'

export type IAchievementsType = 'words-lists' | 'lists' | 'flashcards' | 'quiz'

export interface IAchievement {
  _id: string
  title: string
  titleUa: string
  description: string
  descriptionUa: string
  target: number
  type: IAchievementsType
  image: string
}

const achievementsSchema = new Schema({
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
  target: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const Achievements = mongoose.models.Achievements || mongoose.model('Achievements', achievementsSchema)
export default Achievements
