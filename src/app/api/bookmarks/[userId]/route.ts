'use server'

import Bookmarks from '@/interfaces/Bookmarks.interface'
import connectMongoDB from '@/lib/mongodb'
import { NextResponse } from 'next/server'

// equals to getBookmarksByUserId lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    const bookmarks = await Bookmarks.find({ userId })
    return NextResponse.json(bookmarks)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
