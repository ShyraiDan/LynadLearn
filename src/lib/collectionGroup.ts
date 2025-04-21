'use server'

import connectMongoDB from './mongodb'
import CollectionGroups, { ICollectionsGroup } from '@/interfaces/CollectionGroups.interface'
import Collections from '@/interfaces/Collections.interface'
import { getSession } from './auth'
import { getBookmarksByUserIdAndType } from './bookmark'
import { ICollections } from '@/interfaces/Collections.interface'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'

export const getCollectionsGroup = async (type: string): Promise<ICollectionsGroup> => {
  await connectMongoDB()
  await Collections

  const collectionGroups = await CollectionGroups.findOne({ type }).populate(
    'collections',
    'image title titleUa description descriptionUa lessons words'
  )
  const session = await getSession()

  if (session.userId) {
    const bookmarks = await getBookmarksByUserIdAndType(session.userId as string, 'collection')

    const parsedData = JSON.parse(JSON.stringify(collectionGroups))

    const dataWithBookmarks = parsedData.collections.map((collection: ICollections) => {
      const item = bookmarks.find((bookmark: IBookmarks) => {
        return bookmark.itemId.toString() === collection._id.toString()
      })

      return {
        ...collection,
        isBookmarked: !!item,
        bookmarkId: item ? item._id : ''
      }
    })

    return {
      ...parsedData,
      collections: dataWithBookmarks
    }
  }

  const data = JSON.parse(JSON.stringify(collectionGroups))

  return data
}
