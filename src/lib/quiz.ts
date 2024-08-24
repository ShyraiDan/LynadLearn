'use server'

import mongoose from 'mongoose'
import connectMongoDB from './mongodb'
import Quizzes, { IQuiz } from '@/interfaces/Quiz.interface'

export const getSingleQuiz = async (id: string): Promise<IQuiz | null> => {
  await connectMongoDB()

  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return null
  }

  const grammar = await Quizzes.findById(id)
  const data = JSON.parse(JSON.stringify(grammar))

  return data
}
