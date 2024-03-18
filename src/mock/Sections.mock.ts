import { ISections } from '@/interfaces/Sections.interface'

import book from '@/assets/icons/book.svg'
import idioms from '@/assets/icons/idioms.svg'
import messages from '@/assets/icons/messages-2.svg'
import note from '@/assets/icons/note-2.svg'

export const DSectionLeft: ISections[] = [
  { id: 1, icon: note, title: 'Vocabulary', text: 'Vocabulary lessons from different books and levels.' },
  { id: 2, icon: book, title: 'Grammar', text: 'A complete grammar library written for different levels.' }
]

export const DSectionRight: ISections[] = [
  { id: 1, icon: idioms, title: 'Idioms', text: 'Categorized idioms and expressions.' },
  { id: 2, icon: messages, title: 'Pronunciation', text: 'You can study pronunciation like a here.' }
]
