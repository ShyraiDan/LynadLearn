'use server'

import Bookmarks, { IAddBookmark } from '@/interfaces/Bookmarks.interface'
import connectMongoDB from './mongodb'
import { revalidatePath } from 'next/cache'

export const addBookmark = async (userId: string, bookmark: IAddBookmark) => {
  try {
    await connectMongoDB()

    const existingItem = await Bookmarks.findOne({
      userId: userId,
      itemType: bookmark.itemType,
      itemId: bookmark.itemId
    })

    if (existingItem) {
      console.error('Error adding bookmark: Item already exists.')
      return { success: false }
    }

    const doc = new Bookmarks({
      ...bookmark,
      userId: userId
    })

    await doc.save()

    // revalidatePath('[locale]/dashboard/vocabulary/[id]', 'page')
    return { success: true, id: doc._id.toString() }
  } catch (error) {
    console.error('Error adding bookmark:', error)
    return { success: false }
  }
}

export const getBookmarksByUserId = async (userId: string) => {
  try {
    await connectMongoDB()
    const bookmarks = await Bookmarks.find({ userId: userId })
    return bookmarks
  } catch (error) {
    console.error('Error getting bookmarks:', error)
    return []
  }
}

export const getBookmarksByUserIdAndType = async (userId: string, type: string) => {
  try {
    await connectMongoDB()
    const bookmarks = await Bookmarks.find({ userId: userId, itemType: type })
    return bookmarks
  } catch (error) {
    console.error('Error getting bookmarks:', error)
    return []
  }
}

export const removeBookmark = async (id: string) => {
  try {
    await connectMongoDB()
    await Bookmarks.deleteOne({ _id: id })

    revalidatePath('[locale]/dashboard/bookmarks', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error creating word:', error)
    return { success: false }
  }
}
