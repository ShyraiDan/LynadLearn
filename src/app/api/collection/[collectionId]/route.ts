'use server'

import Collections from '@/interfaces/Collections.interface'
import Sections, { ISection } from '@/interfaces/Section.interface'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import { getSession } from '@/lib/auth'
import { getBookmarksByUserIdAndType } from '@/lib/bookmark'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'

// equals to getCollectionById lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const collectionId = url.pathname.split('/').pop()
  const activityType = url.searchParams.get('activityType')

  try {
    await connectMongoDB()
    await Sections
    const collection = await Collections.findById(collectionId).populate(
      'sections',
      'sectionTitle sectionTitleUa words'
    )

    if (!collection) {
      return NextResponse.json({ message: 'Collection not found' }, { status: 404 })
    }

    const session = await getSession()
    const bookmarks = await getBookmarksByUserIdAndType(session.userId as string, activityType || '')

    const parsedData = JSON.parse(JSON.stringify(collection))

    const dataWithBookmarks = parsedData.sections.map((section: ISection) => {
      const item = bookmarks.find((bookmark: IBookmarks) => {
        return bookmark.itemId.toString() === section._id.toString() && activityType === bookmark.itemType
      })

      return {
        ...section,
        isBookmarked: !!item,
        bookmarkId: item ? item._id : ''
      }
    })

    return NextResponse.json({
      ...parsedData,
      sections: [...dataWithBookmarks]
    })
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
