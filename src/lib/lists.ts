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

export const createList = async (list: IList) => {
  try {
    await connectMongoDB()

    const doc = new List({
      title: list.title
    })

    await doc.save()
  } catch (error: any) {
    // return NextResponse.redirect('/login')
    throw new Error(error)
  }
}
