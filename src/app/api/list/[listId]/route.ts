'use server'

import List from '@/interfaces/List.interface'
import { NextResponse } from 'next/server'

// equals to getListById lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const listId = url.pathname.split('/').pop()

  try {
    const list = await List.findById(listId)

    if (!list) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 })
    }

    return NextResponse.json(list)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
