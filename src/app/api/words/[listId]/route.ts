'use server'

import Word from '@/interfaces/Word.interface'
import { NextResponse } from 'next/server'

// equals to getWordsByListId lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const listId = url.pathname.split('/').pop()

  try {
    const list = await Word.find({ listId }).sort({
      updatedAt: -1
    })

    if (!list) {
      return NextResponse.json({ message: 'No words found' }, { status: 404 })
    }

    return NextResponse.json(list)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
