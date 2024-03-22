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
    title: 'Grammar',
    description:
      'In the Grammar section, you have access to a complete grammar library of the desired language, which is categorized by topic. This library is searchable and you can learn grammar from it through different topics.'
  },
  {
    id: 2,
    icon: pronunciation,
    title: 'Pronunciation',
    description:
      'The pronunciation feature of LanGeek app helps users improve their pronunciation skills through native speaker recordings, pronunciation guides, interactive exercises, as well as pronunciation tips and resources.'
  },
  {
    id: 3,
    icon: vocabulary,
    title: 'Vocabulary review',
    description:
      'The vocabulary review feature of LanGeek app allows users to practice and reinforce their knowledge of words and phrases through various exercises and quizzes.'
  },
  {
    id: 4,
    icon: flashCard,
    title: 'Flash card',
    description:
      'The flashcard feature of LanGeek app enables users to create and study digital flashcards, helping them memorize and review vocabulary, concepts, or any other information they want to learn.'
  },
  {
    id: 5,
    icon: quiz,
    title: 'Quiz',
    description:
      'The quiz feature of LanGeek app allows users to test their knowledge and assess their understanding of various topics through interactive quizzes and assessments.'
  },
  {
    id: 6,
    icon: wordList,
    title: 'Custom word list',
    description:
      'The custom word list feature of LanGeek app allows users to create personalized vocabulary lists tailored to their specific needs. Users can add words they want to learn, along with their definitions and example sentences, to create a customized study resource.'
  },
  {
    id: 7,
    icon: idiom,
    title: 'Idiom & Expression',
    description:
      'The Idiom & Expression list feature of LanGeek app provides users with a comprehensive collection of idioms and expressions in the English language.'
  },
  {
    id: 8,
    icon: tests,
    title: 'English proficiency tests',
    description:
      'The English proficiency tests feature of LanGeek app provides users with a platform to take standardized English proficiency tests, such as TOEFL or IELTS, to assess their language skills. '
  },
  {
    id: 9,
    icon: leither,
    title: 'Leitner system',
    description:
      "The Leitner system list feature of LanGeek app is a study tool that helps users effectively learn and retain vocabulary. It utilizes a spaced repetition algorithm where words are organized into different levels based on the user's familiarity with them. "
  }
]
