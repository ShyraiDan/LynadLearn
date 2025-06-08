'use server'

import mongoose from 'mongoose'
import connectMongoDB from './mongodb'
import Grammar, { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { getBookmarksByUserIdAndType } from '@/lib/bookmark'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'

export const getAllGrammar = async (level: string, activityType?: string): Promise<IGrammarTopic[]> => {
  await connectMongoDB()
  const grammar = await Grammar.find({ level: level })

  const parsedData = JSON.parse(JSON.stringify(grammar))

  const session = await getSession()
  const bookmarks = await getBookmarksByUserIdAndType(session.userId as string, activityType || '')

  const dataWithBookmarks = parsedData.map((grammar: IGrammarTopic) => {
    const item = bookmarks.find((bookmark: IBookmarks) => {
      return bookmark.itemId.toString() === grammar._id.toString() && activityType === bookmark.itemType
    })

    return {
      ...grammar,
      isBookmarked: !!item,
      bookmarkId: item ? item._id : ''
    }
  })

  return dataWithBookmarks
}

export const getSingleGrammar = async (
  id: string
): Promise<{
  data: IGrammarTopic | null
  success: boolean
}> => {
  await connectMongoDB()

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      data: null,
      success: false
    }
  }

  const grammar = await Grammar.findById(id)
  const data = JSON.parse(JSON.stringify(grammar))
  return {
    data,
    success: true
  }
}

export const addSingleGrammar = async (grammar: IGrammarTopic): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()

    const doc = new Grammar({
      ...grammar
    })
    //TODO: Maybe we need to return success as part of promise in then closure
    await doc.save()

    revalidatePath('/admin/dashboard/grammar', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error creating grammar:', error)
    return { success: false }
  }
}

export const updateSingleGrammar = async (grammar: IGrammarTopic): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()

    await Grammar.updateOne(
      { _id: grammar._id },
      {
        ...grammar
      }
    )

    revalidatePath('/admin/dashboard/grammar/[id]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error updating grammar:', error)
    return { success: false }
  }
}

export const deleteSingleGrammar = async (id: string): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()
    await Grammar.deleteOne({ _id: id })

    revalidatePath('/admin/dashboard/grammar/[id]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error creating word:', error)
    return { success: false }
  }
}
