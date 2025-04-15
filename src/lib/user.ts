'use server'

import User, { IUser } from '@/interfaces/User.interface'
import connectMongoDB from './mongodb'
import { getSession } from './auth'

export const getUserById = async (id: string): Promise<IUser> => {
  try {
    await connectMongoDB()
    const user = await User.findById(id)
    const data = JSON.parse(JSON.stringify(user))
    return data
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

export const updateUserByUserId = async (id: string, updateData: Partial<IUser>): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()
    const user = await User.findByIdAndUpdate(
      id,
      {
        $inc: {
          rating: updateData.rating || 0,
          wordLists: updateData.wordLists || 0,
          totalQuizzes: updateData.totalQuizzes || 0,
          successfulQuizzes: updateData.successfulQuizzes || 0,
          flashcardsLearned: updateData.flashcardsLearned || 0,
          words: updateData.words || 0
        }
      },
      { new: true }
    )

    const session = await getSession()

    session.rating = user.rating
    session.wordLists = user.wordLists
    session.totalQuizzes = user.totalQuizzes
    session.successfulQuizzes = user.successfulQuizzes
    session.flashcardsLearned = user.flashcardsLearned
    session.words = user.words

    await session.save()

    // console.log('res', res)
    // console.log('here is the update data')

    return { success: true }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false }
  }
}
