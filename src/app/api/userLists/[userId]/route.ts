'use server'

import List from '@/interfaces/List.interface'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.pathname.split('/').pop()

  try {
    const lists = await List.find({ userId })

    return NextResponse.json(lists ?? [])
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
