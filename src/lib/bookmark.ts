'use server'

import Bookmarks, { IAddBookmark } from '@/interfaces/Bookmarks.interface'
import connectMongoDB from './mongodb'
import { revalidatePath } from 'next/cache'

export const addBookmark = async (userId: string, bookmark: IAddBookmark) => {
  try {
    await connectMongoDB()

    const doc = new Bookmarks({
      ...bookmark,
      userId: userId
    })

    await doc.save()

    // revalidatePath('[locale]/dashboard/vocabulary/[id]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error adding bookmark:', error)
    return { success: false }
  }
}
