'use server'

import Collections from '@/interfaces/Collections.interface'
import Sections from '@/interfaces/Section.interface'
import { NextResponse } from 'next/server'

// equals to getCollectionById lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const collectionId = url.pathname.split('/').pop()

  try {
    await Sections
    const collection = await Collections.findById(collectionId).populate(
      'sections',
      'sectionTitle sectionTitleUa words'
    )

    if (!collection) {
      return NextResponse.json({ message: 'Collection not found' }, { status: 404 })
    }

    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
