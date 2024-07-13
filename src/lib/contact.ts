'use server'

import connectMongoDB from './mongodb'
import ContactModel, { IContactUS } from '@/interfaces/ContactUs.interface'

export const sendContacts = async (values: IContactUS) => {
  await connectMongoDB()

  const doc = new ContactModel({
    userName: values.userName,
    email: values.email,
    subject: values.subject,
    message: values.message
  })

  await doc.save()
}
