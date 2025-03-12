// 'use server'

import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_SERVER_DB_KEY as string)
    console.log('Connected to MongoDB.')
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error)
  }
}

export default connectMongoDB
