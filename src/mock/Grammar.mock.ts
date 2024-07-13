import { IGrammar } from '@/interfaces/Grammar.interface'

export const DGrammar: IGrammar[] = [
  {
    id: 1,
    level: 'A1-A2 grammar',
    topics: [
      {
        id: 1,
        title: 'Adjectives and prepositions',
        data: {
          description: [
            "Some adjectives go with certain prepositions. There are no grammatical rules for which preposition is used with which adjective, so it's a good idea to try to learn them together. To help you do this, write new vocabulary in your notebook in a sentence or phrase.",
            "However, there are some patterns that can help you. Let's look at them first. Remember that a preposition is followed by a noun or a gerund (-ing form)."
          ],
          example: [
            {
              title: 'With at',
              description:
                'We use at with adjectives like good/bad/amazing/brilliant/terrible, etc. to talk about skills and abilities.',
              examples: [
                "He's really good at English.",
                "She's amazing at the piano.",
                "They're terrible at organising anything.",
                "I'm not very good at drawing."
              ]
            },
            {
              title: 'With about',
              description:
                'We often use about with adjectives of feelings like angry/excited/happy/nervous/sad/stressed/worried, etc. to explain what is causing that feeling.',
              examples: [
                "I'm angry about the decision.",
                "He's nervous about the presentation.",
                "She's excited about the new job.",
                'They were worried about the exam.'
              ]
            },
            {
              title: 'With of',
              description: 'However, sometimes we use of with feelings.',
              examples: [
                'She was afraid of telling her mum.',
                "I'm frightened of having an accident.",
                "He's scared of flying.",
                'You should be proud of your progress.'
              ]
            },
            {
              title: 'With to',
              description: 'We can use to to show the connection between people or things.',
              examples: [
                "He's married to the director.",
                "I'm addicted to my phone.",
                "I'm allergic to nuts.",
                "It's similar to the old one."
              ]
            },
            {
              title: 'With for',
              description: '',
              examples: [
                'Exercise is good for you.',
                'Stress is bad for you.',
                'The town is famous for its cheese.',
                "I'm responsible for the financial side of the business."
              ]
            }
          ]
        }
      },
      {
        id: 2,
        title: "Adjectives ending in '-ed' and '-ing'",
        data: {
          description: [
            'Adjectives that end in -ed (e.g. bored, interested) and adjectives that end in -ing (e.g. boring, interesting) are often confused.'
          ],
          example: [
            {
              title: '-ed adjectives',
              description: 'Adjectives that end in -ed generally describe emotions – they tell us how people feel.',
              examples: [
                'I was so bored in that lesson, I almost fell asleep.',
                'He was surprised to see Helen after all those years.',
                'She was really tired and went to bed early.'
              ]
            },
            {
              title: '-ing adjectives',
              description:
                'Adjectives that end in -ing generally describe the thing that causes the emotion – a boring lesson makes you feel bored.',
              examples: [
                "Have you seen that film? It's really frightening.",
                "I could listen to her for hours. She's so interesting.",
                "I can't sleep! That noise is really annoying!"
              ]
            }
          ]
        }
      },
      {
        id: 3,
        title: "Articles: 'a', 'an', 'the'",
        data: {
          description: ['Here are some of the most important things to know about using articles.'],
          example: [
            {
              title: 'Jobs',
              description: "When we say what people's jobs are, we usually use a/an.",
              examples: ["He's an architect.", "She's a scientist.", 'My grandmother was a teacher.']
            },
            {
              title: 'Singular nouns',
              description:
                'Singular, countable nouns always have an article – a/an or the (or another determiner – my, your, this, that, etc.). We use a/an – the indefinite article – when we talk about something for the first time, or something that is part of a group or type.',
              examples: ['I saw a good film yesterday.', 'Do you want a drink?']
            },
            {
              title: '',
              description:
                "We use a when the word that follows it begins with a consonant sound. We use an when it's followed by a vowel sound. This makes pronunciation easier.",
              examples: ['She has a university degree.', 'It took me an hour to get home.']
            },
            {
              title: '',
              description:
                "We use the – the definite article – when the listener already knows which thing we are talking about because it was mentioned before or because there's only one of them.",
              examples: [
                "I'm going to take the dog for a walk.",
                'Have you seen the car key?',
                'They go to the school next to the bridge.'
              ]
            },
            {
              title: 'Things in general',
              description:
                'When we talk about things in general, we normally use a plural or uncountable noun with no article.',
              examples: ['Birds eat worms.', 'Water freezes at 0°C.', 'Children need a lot of sleep.']
            },
            {
              title: 'Particular groups of things',
              description: 'When we talk about a particular group of things, we use the.',
              examples: [
                'We went to the zoo and saw the kangaroos. (These are the particular kangaroos in that zoo – not kangaroos in general.)'
              ]
            }
          ]
        }
      },
      {
        id: 4,
        title: "Articles: 'the' or no article",
        data: {
          description: ['Here are some ways we use articles in common phrases and place names.'],
          example: [
            {
              title: 'Common phrases',
              description: "We don't usually use an article in expressions with bed, work and home.",
              examples: [
                'go to bed / be in bed',
                'go to work / be at work / start work / finish work',
                'go home / be at home / get home / stay at home'
              ]
            },
            {
              title: '',
              description:
                "We also don't normally use an article in expressions with school, university, prison and hospital.",
              examples: [
                'start school / go to school / be at school',
                'go to university / be at university',
                'be sent to prison / go to prison / be in prison',
                'go to hospital / be in hospital'
              ]
            },
            {
              title: '',
              description:
                'But we usually use the if someone is just visiting the place, and not there as a student/prisoner/patient, etc.',
              examples: [
                'My son has started school now. I went to the school to meet his teacher.',
                'I went to the prison a lot when I was a social worker.',
                "I'm at the hospital. My sister has just had a baby."
              ]
            },
            {
              title: 'Place names',
              description:
                "We don't normally use an article for continents, most countries, cities, towns, lakes, mountains or universities. So, we say:",
              examples: [
                'Africa, Asia, Europe',
                'India, Ghana, Peru, Denmark',
                'Addis Ababa, Hanoi, New York, Moscow',
                'Lake Victoria, Lake Superior, Lake Tanganyika',
                'Mount Everest, Mount Kilimanjaro, Mount Elbrus',
                'Cardiff University, Harvard University, Manchester University'
              ]
            },
            {
              title: '',
              description:
                'Some countries are different. Country names with United have the. There are other countries which are exceptions too. So, we say:',
              examples: [
                'the United Arab Emirates, the United Kingdom, the United States of America',
                'the Bahamas, the Gambia'
              ]
            },
            {
              title: '',
              description: 'Seas and oceans, mountain ranges and rivers have the:',
              examples: [
                'the Atlantic, the Pacific, the Mediterranean',
                'the Andes, the Himalayas, the Alps',
                'the Nile, the Amazon, the Yangtze'
              ]
            },
            {
              title: '',
              description: 'Universities with of in the title also have the:',
              examples: ['the University of Cape Town, the University of Delhi, the University of Tokyo']
            }
          ]
        }
      },
      {
        id: 5,
        title: 'Comparative adjectives',
        data: {
          description: [
            'We use comparative adjectives to compare two things or show change. The comparative form depends on the number of syllables in the adjective.'
          ],
          example: [
            {
              title: 'Adjectives with one syllable',
              description: 'To make comparative forms with one-syllable adjectives, we usually add -er:',
              examples: ['old → older', 'clean → cleaner', 'slow → slower']
            },
            {
              title: '',
              description: 'If an adjective ends in -e, we add -r:',
              examples: ['safe → safer', 'nice → nicer']
            },
            {
              title: '',
              description: 'If an adjective ends in a vowel and a consonant, we usually double the consonant:',
              examples: ['big → bigger', 'hot → hotter']
            },
            {
              title: 'Adjectives with two or more syllables',
              description: 'If a two-syllable adjective ends in a consonant and -y, we change -y to -i and add -er:',
              examples: ['noisy → noisier', 'happy → happier', 'easy → easier']
            },
            {
              title: '',
              description:
                'We use more to make comparative forms for most other two-syllable adjectives and for all adjectives with three or more syllables:',
              examples: ['crowded → more crowded', 'stressful → more stressful', 'dangerous → more dangerous']
            },
            {
              title: '',
              description:
                'Exception: You can either add -er/-r or use more with some two-syllable adjectives, such as common, cruel, gentle, handsome, likely, narrow, pleasant, polite, simple and stupid.',
              examples: [
                'I think life in the countryside is simpler than in the city.',
                "It's more simple to live in the city because everything you need is there."
              ]
            },
            {
              title: 'Irregular adjectives',
              description: 'The adjectives good, bad and far have irregular comparative forms:',
              examples: ['good → better', 'bad → worse', 'far → further/farther']
            },
            {
              title: 'Than',
              description: 'When we want to say which person or thing we are comparing with, we can use than:',
              examples: [
                'Their house is cleaner than ours.',
                'Traffic is slower in the city than in the countryside.',
                'After the race I was more tired than Anne.'
              ]
            }
          ]
        }
      },
      {
        id: 6,
        title: 'Infinitive of purpose'
      },
      {
        id: 7,
        title: 'Nouns: countable and uncountable'
      },
      {
        id: 8,
        title: "Possessive 's"
      },
      {
        id: 9,
        title: "Prepositions of place – 'in', 'on', 'at'"
      },
      {
        id: 10,
        title: "Prepositions of time: 'at', 'in', 'on'"
      },
      {
        id: 11,
        title: 'Present Simple'
      },
      {
        id: 12,
        title: "Present simple: 'have got'"
      },
      {
        id: 13,
        title: "Present simple: 'to be'"
      },
      {
        id: 14,
        title: "Quantifiers: 'few', 'a few', 'little' and 'a bit of'"
      },
      {
        id: 15,
        title: 'Question forms'
      },
      {
        id: 16,
        title: "Verbs followed by '-ing' or infinitive"
      }
    ]
  },
  {
    id: 2,
    level: 'B1-B2 grammar',
    topics: [
      {
        id: 1,
        title: 'Adjectives: gradable and non-gradable'
      },
      {
        id: 2,
        title: 'British English and American English'
      },
      {
        id: 3,
        title: 'Capital letters and apostrophes'
      },
      {
        id: 4,
        title: 'Conditionals: third and mixed'
      },
      {
        id: 5,
        title: 'Conditionals: zero, first and second'
      },
      {
        id: 6,
        title: "Contrasting ideas: 'although', 'despite' and others"
      },
      {
        id: 7,
        title: "Different uses of 'used to'"
      },
      {
        id: 8,
        title: 'Future continuous and future perfect'
      },
      {
        id: 9,
        title: "Future forms: 'will', 'be going to' and present continuous"
      },
      {
        id: 10,
        title: "Intensifiers: 'so' and 'such'"
      },
      {
        id: 11,
        title: 'Modals: deductions about the past'
      },
      {
        id: 12,
        title: 'Modals: deductions about the present'
      }
    ]
  }
]
