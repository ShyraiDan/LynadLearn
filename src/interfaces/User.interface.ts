import mongoose, { Schema } from 'mongoose'

export interface IUser {
  userName?: string
  email: string
  location?: string
  description?: string
  avatarUrl?: string
  password: string
  rating: number
}

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    avatarUrl: String,
    location: String,
    description: String,
    rating: {
      type: Number,
      default: 0,
      required: true
    },
    wordLists: {
      type: Number,
      default: 0,
      required: true
    },
    totalQuizzes: {
      type: Number,
      default: 0,
      required: true
    },
    successfulQuizzes: {
      type: Number,
      default: 0,
      required: true
    },
    flashcardsLearned: {
      type: Number,
      default: 0,
      required: true
    },
    words: {
      type: Number,
      default: 0,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.Users || mongoose.model('Users', userSchema)
export default User
