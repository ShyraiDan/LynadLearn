'use server'

import connectMongoDB from './mongodb'
import Word, { IWord } from '@/interfaces/Word.interface'

export const createWord = async (userWord: IWord) => {
  try {
    await connectMongoDB()

    const doc = new Word({
      word: userWord.word,
      definition: userWord.definition,
      example: userWord.example,
      part_of_speech: userWord.part_of_speech,
      translation: userWord.translation,
      pronunciation: userWord.pronunciation
    })

    await doc.save()
  } catch (error: any) {
    // return NextResponse.redirect('/login')
    throw new Error(error)
  }
}
