import { ICategory } from '@/interfaces/Category.interface'
import A1 from '@/assets/A1.png'
import A2 from '@/assets/A2.png'
import B1 from '@/assets/B1.png'
import B2 from '@/assets/B2.png'
import C1 from '@/assets/C1.png'

export const DCategories: ICategory[] = [
  {
    id: '1',
    title: 'your_lists',
    description: '',
    lists: []
  },
  {
    id: '2',
    title: 'cefr_wordlist',
    description: 'cefr_wordlist_detail',
    lists: [
      {
        id: '1',
        title: 'A1 Level Wordlist',
        image: A1
      },
      {
        id: '2',
        title: 'A2 Level Wordlist',
        image: A2
      },
      {
        id: '3',
        title: 'B1 Level Wordlist',
        image: B1
      },
      {
        id: '4',
        title: 'B2 Level Wordlist',
        image: B2
      },
      {
        id: '5',
        title: 'C1 Level Wordlist',
        image: C1
      }
    ]
  },
  {
    id: '3',
    title: 'cefr_wordlist',
    description: 'cefr_wordlist_detail',
    lists: [
      {
        id: '1',
        title: 'A1 Level Wordlist',
        image: A1
      },
      {
        id: '2',
        title: 'A2 Level Wordlist',
        image: A2
      },
      {
        id: '3',
        title: 'B1 Level Wordlist',
        image: B1
      },
      {
        id: '4',
        title: 'B2 Level Wordlist',
        image: B2
      },
      {
        id: '5',
        title: 'C1 Level Wordlist',
        image: C1
      }
    ]
  }
]
