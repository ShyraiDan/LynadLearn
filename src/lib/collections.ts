'use server'

import Collections, { ICollections } from '@/interfaces/Collections.interface'
import Sections from '@/interfaces/Section.interface'

export const getCollectionById = async (id: string): Promise<ICollections> => {
  await Sections
  const collections = await Collections.findById(id).populate('sections', 'sectionTitle sectionTitleUa words')
  const data = JSON.parse(JSON.stringify(collections))

  return data
}
