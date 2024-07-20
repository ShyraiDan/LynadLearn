'use server'

import connectMongoDB from './mongodb'
import Quizzes, { IQuiz } from '@/interfaces/Quiz.interface'

export const getSingleQuiz = async (title: string): Promise<IQuiz> => {
  await connectMongoDB()
  const grammar = await Quizzes.findOne({ title: title })
  const data = JSON.parse(JSON.stringify(grammar))

  return data
}
