'use server'

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
