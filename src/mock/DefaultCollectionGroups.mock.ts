import { IDefaultCollectionGroup } from '@/interfaces/DefaultCollectionGroup.interface'

export const DCEFRCollectionGroup: IDefaultCollectionGroup = {
  _id: 'DCEFRCollectionGroup',
  title: 'cefr_wordlist',
  description: 'cefr_wordlist_detail',
  collections: [
    {
      id: '67dbe62947b1e296ff356e45',
      title: 'a1_list',
      image: 'A1.png'
    },
    {
      id: '67dbe62947b1e296ff356e46',
      title: 'a2_list',
      image: 'A2.png'
    },
    {
      id: '67dbe62947b1e296ff356e47',
      title: 'b1_list',
      image: 'B1.png'
    },
    {
      id: '67dbe62947b1e296ff356e48',
      title: 'b2_list',
      image: 'B2.png'
    },
    {
      id: '67dbe62947b1e296ff356e49',
      title: 'c1_list',
      image: 'C1.png'
    },
    {
      id: '67dbe62947b1e296ff356e4a',
      title: 'c2_list',
      image: 'C2.png'
    }
  ]
}

export const DCommonWords: IDefaultCollectionGroup = {
  _id: 'DCommonWords',
  title: 'common_wordlist',
  description: 'common_wordlist_detail',
  collections: [
    {
      id: '67d6e27164b568a5f85ba41e',
      title: 'common_verbs',
      image: '500_verbs.png'
    },
    {
      id: '67d6e27164b568a5f85ba41f',
      title: 'common_phrase',
      image: '250_phrase.jpg'
    },
    {
      id: '67d6e27164b568a5f85ba420',
      title: 'common_adjectives',
      image: '500_adjectives.jpg'
    },
    {
      id: '67d6e27164b568a5f85ba421',
      title: 'common_adverbs',
      image: '500_adverbs.jpg'
    },
    {
      id: '67d6e27164b568a5f85ba422',
      title: 'common_nouns',
      image: '500_nouns.jpg'
    }
  ]
}
