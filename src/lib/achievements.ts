import connectMongoDB from './mongodb'
import Achievements, { IAchievement } from '@/interfaces/Achievements.interface'

export const getAllAchievements = async (): Promise<IAchievement[]> => {
  await connectMongoDB()
  const achievements = await Achievements.find()
  const data = JSON.parse(JSON.stringify(achievements))
  return data
}
