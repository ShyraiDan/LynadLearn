'use server'

import Grammar from '@/interfaces/Grammar.interface'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import { getSession } from '@/lib/auth'
import { getBookmarksByUserIdAndType } from '@/lib/bookmark'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { IBookmarks } from '@/interfaces/Bookmarks.interface'

// equals to getAllGrammar lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const activityType = url.searchParams.get('activityType')

  try {
    await connectMongoDB()
    const grammar = await Grammar.find({ level: 'A1-A2' })
    const parsedData = JSON.parse(JSON.stringify(grammar))

    const session = await getSession()
    const bookmarks = await getBookmarksByUserIdAndType(session.userId as string, activityType || '')

    const dataWithBookmarks = parsedData.map((grammar: IGrammarTopic) => {
      const item = bookmarks.find((bookmark: IBookmarks) => {
        return bookmark.itemId.toString() === grammar._id.toString() && activityType === bookmark.itemType
      })

      return {
        ...grammar,
        isBookmarked: !!item,
        bookmarkId: item ? item._id : ''
      }
    })

    return NextResponse.json(dataWithBookmarks)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
