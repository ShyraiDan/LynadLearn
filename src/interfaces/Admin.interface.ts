import mongoose, { Schema } from 'mongoose'

export interface IAdmin {
  adminName: string
  email: string
}

const adminSchema = new Schema(
  {
    adminName: {
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
    }
  },
  {
    timestamps: true
  }
)

const Admin = mongoose.models.Admins || mongoose.model('Admins', adminSchema)
export default Admin

export interface IAdminSignUp {
  email: string
  password: string
  adminName: string
  confirmPassword: string
}

export interface IAdminSignIn {
  email: string
  password: string
}
