'use server'

import { revalidatePath } from 'next/cache'
import connectMongoDB from './mongodb'
import DefaultWord, { IDefaultWord } from '@/interfaces/defaultWords.interface'

export const getSearchDefaultWords = async (word: string): Promise<IDefaultWord[]> => {
  await connectMongoDB()
  const list = await DefaultWord.find({ word: { $regex: word, $options: 'i' } }).limit(12)
  const data = JSON.parse(JSON.stringify(list))

  return data
}

export const getDefaultWordsById = async (id: string): Promise<IDefaultWord> => {
  await connectMongoDB()
  const word = await DefaultWord.findById(id)
  const data = JSON.parse(JSON.stringify(word))

  return data
}

export const createDefaultWord = async (userWord: IDefaultWord): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()

    const doc = new DefaultWord({
      word: userWord.word,
      results: userWord.results,
      translation: userWord.translation,
      pronunciation: userWord.pronunciation,
      listId: userWord.listId
    })
    //TODO: Maybe we need to return success as part of promise in then closure
    await doc.save()

    revalidatePath('/admin/dashboard/vocabulary/[wordId]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error creating word:', error)
    return { success: false }
  }
}

export const updateDefaultWordById = async (word: IDefaultWord): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()

    await DefaultWord.updateOne(
      { _id: word._id },
      {
        word: word.word,
        results: word.results,
        translation: word.translation,
        pronunciation: word.pronunciation,
        listId: word.listId
      }
    )

    revalidatePath('/admin/dashboard/vocabulary/[wordId]', 'page')
    return { success: true }
  } catch (error) {
    console.error('Error updating word:', error)
    return { success: false }
  }
}

export const deleteDefaultWordById = async (id: string): Promise<{ success: boolean }> => {
  try {
    await connectMongoDB()
    await DefaultWord.deleteOne({ _id: id })

    return { success: true }
  } catch (error) {
    console.error('Error creating word:', error)
    return { success: false }
  }
}
