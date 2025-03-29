'use server'

import Sections from '@/interfaces/Section.interface'
import DefaultWords from '@/interfaces/defaultWords.interface'
import { NextResponse } from 'next/server'

export const getSectionById = async (id: string): Promise<NextResponse> => {
  try {
    await DefaultWords
    const sections = await Sections.findById(id).populate(
      'words',
      'word results pronunciation translation listId common_adverb common_noun common_verb common_adjective common_phrase'
    )

    if (!sections) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 })
    }

    return NextResponse.json(sections)
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
