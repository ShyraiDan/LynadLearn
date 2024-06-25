'use server'

import connectMongoDB from './mongodb'
import List, { IList } from '@/interfaces/List.interface'

export const getYourLists = async (): Promise<IList[]> => {
  try {
    await connectMongoDB()
    const lists = await List.find()
    const data = JSON.parse(JSON.stringify(lists))
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getListById = async (id: string): Promise<IList> => {
  try {
    await connectMongoDB()
    const list = await List.findById(id)
    const data = JSON.parse(JSON.stringify(list))

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createList = async (list: IList) => {
  try {
    await connectMongoDB()

    const doc = new List({
      title: list.title,
      words: [],
      userId: '667089268e4f38e9c82cb91d'
    })

    await doc.save()
  } catch (error: any) {
    // return NextResponse.redirect('/login')
    throw new Error(error)
  }
}
