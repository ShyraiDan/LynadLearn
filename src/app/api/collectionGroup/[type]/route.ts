'use server'

import CollectionGroups from '@/interfaces/CollectionGroups.interface'
import Collections, { ICollections } from '@/interfaces/Collections.interface'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import { getSession } from '@/lib/auth'
import { getBookmarksByUserIdAndType } from '@/lib/bookmark'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'

// equals to getCollectionsGroup lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const type = url.pathname.split('/').pop()
  const activityType = url.searchParams.get('activityType')

  try {
    await connectMongoDB()

    await Collections
    const collectionGroups = await CollectionGroups.findOne({ type }).populate(
      'collections',
      'image title titleUa description descriptionUa lessons words'
    )

    const session = await getSession()
    const bookmarks = await getBookmarksByUserIdAndType(session.userId as string, 'collection')

    const parsedData = JSON.parse(JSON.stringify(collectionGroups))

    const dataWithBookmarks = parsedData.collections.map((collection: ICollections) => {
      const item = bookmarks.find((bookmark: IBookmarks) => {
        return bookmark.itemId.toString() === collection._id.toString() && activityType === bookmark.itemType
      })

      return {
        ...collection,
        isBookmarked: !!item,
        bookmarkId: item ? item._id : ''
      }
    })

    return NextResponse.json({
      ...parsedData,
      collections: dataWithBookmarks
    })
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error 21: ${error}` }, { status: 500 })
  }
}
