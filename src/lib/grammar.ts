'use server'

import mongoose from 'mongoose'
import connectMongoDB from './mongodb'
import Grammar, { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { revalidatePath } from 'next/cache'

export const getAllGrammar = async (level: string): Promise<IGrammarTopic[]> => {
  await connectMongoDB()
  const grammar = await Grammar.find({ level: level })
  const data = JSON.parse(JSON.stringify(grammar))

  return data
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

export const getSingleGrammar = async (id: string): Promise<IGrammarTopic | null> => {
  await connectMongoDB()

  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return null
  }

  const grammar = await Grammar.findById(id)
  const data = JSON.parse(JSON.stringify(grammar))
  return data
}
