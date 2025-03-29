'use server'

import Sections from '@/interfaces/Section.interface'
import DefaultWords from '@/interfaces/defaultWords.interface'
import { NextResponse } from 'next/server'

// equals to getSectionById lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const sectionId = url.pathname.split('/').pop()

  try {
    await DefaultWords
    const section = await Sections.findById(sectionId).populate(
      'words',
      'word results pronunciation translation listId common_adverb common_noun common_verb common_adjective common_phrase'
    )

    if (!section) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 })
    }

    return NextResponse.json(section)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
