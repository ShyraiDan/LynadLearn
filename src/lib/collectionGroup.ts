'use server'

import { getSession } from './auth'
import connectMongoDB from './mongodb'
import mongoose from 'mongoose'
import CollectionGroups, { ICollectionsGroup } from '@/interfaces/CollectionGroups'

export const getCollectionsGroup = async (type: string): Promise<ICollectionsGroup> => {
  console.log('type', type)
  await connectMongoDB()

  const collectionGroups = await CollectionGroups.findOne({ type: 'adverbs' }).populate(
    'collections',
    'image title titleUa description descriptionUa lessons words'
  )
  const data = JSON.parse(JSON.stringify(collectionGroups))

  return data
}
