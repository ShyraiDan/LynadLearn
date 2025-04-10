'use server'

import List from '@/interfaces/List.interface'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'

// equals to getUserLists lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    const lists = await List.find({ userId })

    return NextResponse.json(lists ?? [])
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
