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
  const list = await Word.find({ listId: id })
  const data = JSON.parse(JSON.stringify(list))

  return data
}
