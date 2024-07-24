import { IAchievement } from '@/interfaces/Achievements.interface'

import {
  FaBookOpen,
  FaBaby,
  FaChild,
  FaGraduationCap,
  FaMedal,
  FaWalking,
  FaTrophy,
  FaBrain,
  FaCrown,
  FaClipboardList,
  FaProjectDiagram,
  FaBuilding,
  FaPlusCircle,
  FaList,
  FaClipboardCheck,
  FaArchive
} from 'react-icons/fa'

export const DAchievement: IAchievement[] = [
  {
    id: '1',
    title: 'first_word',
    description: 'first_word_desc',
    icon: FaBookOpen,
    target: 1,
    type: 'flashcards'
  },
  {
    id: '2',
    title: 'beginner',
    description: 'beginner_desc',
    icon: FaBaby,
    target: 10,
    type: 'flashcards'
  },
  {
    id: '3',
    title: 'enthusiastic_learner',
    description: 'enthusiastic_learner_desc',
    icon: FaChild,
    target: 50,
    type: 'flashcards'
  },
  {
    id: '4',
    title: 'vocabulary_master',
    description: 'vocabulary_master_desc',
    icon: FaGraduationCap,
    target: 100,
    type: 'flashcards'
  },
  {
    id: '5',
    title: 'language_guru',
    description: 'language_guru_desc',
    icon: FaMedal,
    target: 500,
    type: 'flashcards'
  },
  {
    id: '6',
    title: 'first_step',
    description: 'first_step_desc',
    icon: FaWalking,
    target: 1,
    type: 'quiz'
  },
  {
    id: '7',
    title: 'quiz_champion',
    description: 'quiz_champion_desc',
    icon: FaTrophy,
    target: 10,
    type: 'quiz'
  },
  {
    id: '8',
    title: 'brainstormer',
    description: 'brainstormer_desc',
    icon: FaBrain,
    target: 50,
    type: 'quiz'
  },
  {
    id: '9',
    title: 'quiz_master',
    description: 'quiz_master_desc',
    icon: FaCrown,
    target: 100,
    type: 'quiz'
  },
  {
    id: '10',
    title: 'words_collector',
    description: 'words_collector_desc',
    icon: FaClipboardList,
    target: 1,
    type: 'lists'
  },
  {
    id: '11',
    title: 'langugage_architect',
    description: 'language_architect_desc',
    icon: FaProjectDiagram,
    target: 5,
    type: 'lists'
  },
  {
    id: '12',
    title: 'language_tycoon',
    description: 'language_tycoon_desc',
    icon: FaBuilding,
    target: 10,
    type: 'lists'
  },
  {
    id: '13',
    title: 'vocabulary_starter',
    description: 'vocabulary_starter_desc',
    icon: FaPlusCircle,
    target: 1,
    type: 'words-lists'
  },
  {
    id: '14',
    title: 'vocabulary_organizer',
    description: 'vocabulary_organizer_desc',
    icon: FaList,
    target: 50,
    type: 'words-lists'
  },
  {
    id: '15',
    title: 'vocabulary_master',
    description: 'vocabulary_master_desc',
    icon: FaClipboardCheck,
    target: 200,
    type: 'words-lists'
  },
  {
    id: '16',
    title: 'vocabulary_archivist',
    description: 'vocabulary_archivist_desc',
    icon: FaArchive,
    target: 500,
    type: 'words-lists'
  }
]
