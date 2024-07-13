import mongoose, { Schema } from 'mongoose'

export interface IContactUS {
  userName: string
  email: string
  subject: string
  message: string
}

const contactUsSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactUsSchema)
export default ContactModel
