'use server'

import { revalidatePath } from 'next/cache'
import connectMongoDB from './mongodb'
import Word, { IWord } from '@/interfaces/Word.interface'

export const createWord = async (userWord: IWord) => {
  await connectMongoDB()

  const doc = new Word({
    word: userWord.word,
    definition: userWord.definition,
    example: userWord.example,
    part_of_speech: userWord.part_of_speech,
    translation: userWord.translation,
    pronunciation: userWord.pronunciation,
    listId: userWord.listId
  })

  await doc.save()

  revalidatePath('[locale]/dashboard/vocabulary/[id]', 'page')
}

export const getWordsByListId = async (id: string): Promise<IWord[]> => {
  await connectMongoDB()
  const list = await Word.find({ listId: id }).sort({
    updatedAt: -1
  })
  const data = JSON.parse(JSON.stringify(list))

  return data
}

export const updateWordById = async (word: IWord): Promise<void> => {
  await connectMongoDB()

  await Word.updateOne(
    { _id: word._id },
    {
      word: word.word,
      definition: word.definition,
      example: word.example,
      part_of_speech: word.part_of_speech,
      translation: word.translation,
      pronunciation: word.pronunciation
    }
  )

  revalidatePath('[locale]/dashboard/vocabulary/[id]', 'page')
}

export const deleteWordById = async (id: string): Promise<void> => {
  await connectMongoDB()
  await Word.deleteOne({ _id: id })

  revalidatePath('[locale]/dashboard/vocabulary/[id]', 'page')
}

export const getWordsByListIdSortedByName = async (id: string, sort: string): Promise<IWord[]> => {
  await connectMongoDB()
  let list = []

  if (sort === 'a-z') {
    list = await Word.find({ listId: id }).sort({
      word: 1
    })
  } else {
    list = await Word.find({ listId: id }).sort({
      word: -1
    })
  }

  const data = JSON.parse(JSON.stringify(list))

  return data
}
