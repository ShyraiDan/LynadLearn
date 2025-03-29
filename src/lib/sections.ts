'use server'

import Sections, { ISection } from '@/interfaces/Section.interface'
import DefaultWords from '@/interfaces/defaultWords.interface'

export const getSectionById = async (id: string): Promise<ISection> => {
  await DefaultWords
  const sections = await Sections.findById(id).populate(
    'words',
    'word results pronunciation translation listId common_adverb common_noun common_verb common_adjective common_phrase'
  )
  const data = JSON.parse(JSON.stringify(sections))

  return data
}
