'use server'

import { revalidatePath } from 'next/cache'
import connectMongoDB from './mongodb'
import List, { IList } from '@/interfaces/List.interface'
import { getSession } from './auth'

export const getYourLists = async (): Promise<IList[]> => {
  const session = await getSession()

  if (!session.userId) {
    return []
  }

  await connectMongoDB()
  const lists = await List.find({ userId: session.userId })
  const data = JSON.parse(JSON.stringify(lists))
  return data
}

export const createList = async (list: IList) => {
  const session = await getSession()

  if (!session.userId) {
    return {
      error: 'You must be logged in to create a list'
    }
  }

  await connectMongoDB()

  const doc = new List({
    title: list.title,
    userId: session.userId
  })

  await doc.save()

  revalidatePath('[locale]/dashboard/lists', 'page')
}

export const getListById = async (id: string): Promise<IList> => {
  await connectMongoDB()
  const list = await List.findById(id)
  const data = JSON.parse(JSON.stringify(list))
  return data
}

export const updateListById = async (id: string, list: IList) => {
  try {
    await connectMongoDB()

    await List.updateOne(
      { _id: id },
      {
        title: list.title,
        avatarUrl: list.image
      }
    )

    revalidatePath('[locale]/dashboard/vocabulary/[id]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error updating word:', error)
    return { success: false }
  }
}

export const deleteListById = async (id: string) => {
  try {
    await connectMongoDB()
    await List.deleteOne({ _id: id })

    return { success: true }
  } catch (error) {
    console.log('Error deleting list:', error)
    return { success: false }
  }
}
