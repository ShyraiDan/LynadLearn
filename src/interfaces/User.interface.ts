import mongoose, { Schema } from 'mongoose'

export interface IUser {
  id: number
  userName: string
  email: string
  location: string
  description: string
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
    description: String
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.Users || mongoose.model('Users', userSchema)
export default User
