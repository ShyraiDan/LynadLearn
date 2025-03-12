'use server'

import { getSession } from './auth'
import connectMongoDB from './mongodb'
import mongoose from 'mongoose'
import Collections, { ICollections } from '@/interfaces/Collections.interface'

export const getCollectionById = async (id: string): Promise<[]> => {
  const collections = await Collections.findById(id)
  const data = JSON.parse(JSON.stringify(collections))

  return data
}
