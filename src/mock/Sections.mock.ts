import { ISections } from '@/interfaces/Sections.interface'

import book from '@/assets/icons/book.svg'
import idioms from '@/assets/icons/idioms.svg'
import messages from '@/assets/icons/messages-2.svg'
import note from '@/assets/icons/note-2.svg'

export const DSectionLeft: ISections[] = [
  { id: 1, icon: note, title: 'vocabulary', text: 'vocabulary_lessons' },
  { id: 2, icon: book, title: 'grammar', text: 'complete_grammar' }
]

export const DSectionRight: ISections[] = [
  { id: 1, icon: idioms, title: 'idioms', text: 'idioms_expression' },
  { id: 2, icon: messages, title: 'pronunciation', text: 'you_can_study' }
]
