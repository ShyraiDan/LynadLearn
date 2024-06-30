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
    // words: [],
    userId: session.userId
  })

  await doc.save()

  revalidatePath('[locale]/dashboard/lists', 'page')
}
