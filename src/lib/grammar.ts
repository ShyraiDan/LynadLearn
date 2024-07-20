'use server'

import connectMongoDB from './mongodb'
import Grammar, { IGrammarTopic } from '@/interfaces/Grammar.interface'

export const getAllGrammar = async (level: string): Promise<IGrammarTopic[]> => {
  await connectMongoDB()
  const grammar = await Grammar.find({ level: level })
  const data = JSON.parse(JSON.stringify(grammar))

  return data
}

export const getSingleGrammar = async (id: string): Promise<IGrammarTopic> => {
  await connectMongoDB()
  const grammar = await Grammar.findById(id)
  const data = JSON.parse(JSON.stringify(grammar))
  return data
}
