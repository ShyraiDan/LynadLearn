import { IFeatures } from '@/interfaces/Features.interface'

import grammar from '@/assets/icons/book.svg'
import pronunciation from '@/assets/icons/messages-2.svg'
import vocabulary from '@/assets/icons/note.svg'
import flashCard from '@/assets/icons/flashcard-2.svg'
import quiz from '@/assets/icons/task.svg'
import wordList from '@/assets/icons/folder-open.svg'
import idiom from '@/assets/icons/idioms.svg'
import tests from '@/assets/icons/english-tests.svg'
import leither from '@/assets/icons/box.svg'

export const DFeatures: IFeatures[] = [
  {
    id: 1,
    icon: grammar,
    title: 'grammar',
    description: 'grammar_section'
  },
  {
    id: 2,
    icon: pronunciation,
    title: 'pronunciation',
    description: 'pronunciation_section'
  },
  {
    id: 3,
    icon: vocabulary,
    title: 'vocabulary_review',
    description: 'vocabulary_section'
  },
  {
    id: 4,
    icon: flashCard,
    title: 'flash_card',
    description: 'flash_card_section'
  },
  {
    id: 5,
    icon: quiz,
    title: 'quiz',
    description: 'quiz_section'
  },
  {
    id: 6,
    icon: wordList,
    title: 'custom_word_list',
    description: 'custom_word_list_section'
  },
  {
    id: 7,
    icon: idiom,
    title: 'idioms_expressions',
    description: 'idioms_expressions_section'
  },
  {
    id: 8,
    icon: tests,
    title: 'tests',
    description: 'tests_section'
  },
  {
    id: 9,
    icon: leither,
    title: 'leither_system',
    description: 'leitner_system_section'
  }
]
