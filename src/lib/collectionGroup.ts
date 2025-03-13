'use server'

import connectMongoDB from './mongodb'
import CollectionGroups, { ICollectionsGroup } from '@/interfaces/CollectionGroups.interface'
import Collections from '@/interfaces/Collections.interface'

export const getCollectionsGroup = async (type: string): Promise<ICollectionsGroup> => {
  await connectMongoDB()
  await Collections

  const collectionGroups = await CollectionGroups.findOne({ type }).populate(
    'collections',
    'image title titleUa description descriptionUa lessons words'
  )
  const data = JSON.parse(JSON.stringify(collectionGroups))

  return data
}
