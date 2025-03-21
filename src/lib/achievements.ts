'use server'

import connectMongoDB from './mongodb'
import Achievements, { IAchievement } from '@/interfaces/Achievements.interface'
import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'

export const getAllAchievements = async (): Promise<IAchievement[]> => {
  await connectMongoDB()
  const achievements = await Achievements.find()
  const data = JSON.parse(JSON.stringify(achievements))
  return data
}

export const getSingleAchievements = async (
  id: string
): Promise<{
  data: IAchievement | null
}> => {
  await connectMongoDB()

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      data: null
    }
  }

  const achievement = await Achievements.findById(id)
  const data = JSON.parse(JSON.stringify(achievement))
  return {
    data
  }
}

export const createSingleAchievements = async (achievement: IAchievement): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()

    const doc = new Achievements({
      ...achievement
    })
    //TODO: Maybe we need to return success as part of promise in then closure
    await doc.save()

    revalidatePath('/admin/dashboard/achievements', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error creating grammar:', error)
    return { success: false }
  }
}

export const updateSingleAchievements = async (
  achievement: IAchievement
): Promise<{
  success: boolean
}> => {
  try {
    await connectMongoDB()
    if (!mongoose.Types.ObjectId.isValid(achievement._id)) {
      return {
        success: false
      }
    }

    await Achievements.updateOne(
      { _id: achievement._id },
      {
        ...achievement
      }
    )

    revalidatePath('/admin/dashboard/grammar/[id]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error updating grammar:', error)
    return { success: false }
  }
}

export const deleteSingleAchievements = async (id: string): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()
    await Achievements.deleteOne({ _id: id })

    revalidatePath('/admin/dashboard/achievements', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error creating word:', error)
    return { success: false }
  }
}
