'use server'

// import mongoose, { ObjectId } from 'mongoose'
// import connectMongoDB from './mongodb'
import { IVocabularyQuestion, IVocabularyQuiz } from '@/interfaces/Quiz.interface'
// import Grammar, { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { IWord } from '@/interfaces/Word.interface'
import { shuffleArray } from '@/utils/middlewares'
import { nanoid } from 'nanoid'

// export const getGrammarQuiz = async (
//   id: string
// ): Promise<{
//   data: IGrammarTopic | null
//   success: boolean
// }> => {
//   await connectMongoDB()

//   if (mongoose.Types.ObjectId.isValid(id) === false) {
//     return {
//       data: null,
//       success: false
//     }
//   }

//   const grammar = await Grammar.findById(id)

//   if (grammar) {
//     const data = JSON.parse(JSON.stringify(grammar))
//     return {
//       data,
//       success: true
//     }
//   } else {
//     return {
//       data: null,
//       success: false
//     }
//   }
// }

// export const updateGrammarQuiz = async (grammar: IGrammarTopic): Promise<{ id?: ObjectId; success: boolean }> => {
//   try {
//     await connectMongoDB()

//     await Quizzes.updateOne(
//       { _id: grammar._id },
//       {
//         ...grammar
//       }
//     )

//     return { id: quiz._id, success: true }
//   } catch (error) {
//     console.error('Error updating quiz:', error)
//     return { success: false }
//   }
// }

const defaultVocabularyQuizQuestions = [
  {
    question: {
      en: 'Choose correct translation for the word "{eng_word}"',
      ua: 'Виберіть правильний переклад слова "{eng_word}"'
    },
    option: '{word_translation}'
  },
  {
    question: {
      en: 'Choose word which means "{word_meaning}"',
      ua: 'Виберіть слово, яке означає "{word_meaning}"'
    },
    option: '{eng_word}'
  },
  {
    question: {
      en: 'This word is synonym to "{word_synonym}"',
      ua: 'Це слово є синонімом до слова "{word_synonym}"'
    },
    option: '{eng_word}'
  },
  {
    question: {
      en: 'Choose word which we can translate as "{word_translation}"',
      ua: 'Виберіть слово, яке можна перекласти "{word_translation}"'
    },
    option: '{eng_word}'
  }
]

export const getVocabularyQuiz = async (words: IWord[]): Promise<IVocabularyQuiz | null> => {
  if (!words.length) {
    return null
  }

  // const list = await getListById(listId)

  const shuffledWords: IWord[] = shuffleArray(words)
  const questions: IVocabularyQuestion[] = []

  shuffledWords.forEach((word: IWord, i) => {
    // Generate question section
    const rndQuestion = Math.floor(Math.random() * defaultVocabularyQuizQuestions.length)
    let generateQuestion = defaultVocabularyQuizQuestions[rndQuestion].question

    switch (rndQuestion) {
      case 0:
        generateQuestion = {
          en: generateQuestion.en.replace('{eng_word}', word.word),
          ua: generateQuestion.ua.replace('{eng_word}', word.word)
        }
        break
      case 1: {
        const rndMeaning = Math.floor(Math.random() * word.results.length)
        generateQuestion = {
          en: generateQuestion.en.replace('{word_meaning}', word.results[rndMeaning].definition),
          ua: generateQuestion.ua.replace('{word_meaning}', word.results[rndMeaning].definition)
        }
        break
      }
      case 2: {
        const rndMeaning = Math.floor(Math.random() * word.results.length)
        const rndSynonym = Math.floor(Math.random() * word.results[rndMeaning].synonyms.length)
        generateQuestion = {
          en: generateQuestion.en.replace('{word_synonym}', word.results[rndMeaning].synonyms[rndSynonym]),
          ua: generateQuestion.ua.replace('{word_synonym}', word.results[rndMeaning].synonyms[rndSynonym])
        }
        break
      }
      default: {
        const rndTranslation = Math.floor(Math.random() * word.translation.ua.length)
        generateQuestion = {
          en: generateQuestion.en.replace('{word_translation}', word.translation.ua[rndTranslation]),
          ua: generateQuestion.ua.replace('{word_translation}', word.translation.ua[rndTranslation])
        }
      }
    }

    // Generate answer section
    const unique = new Set([i])
    let k = 0

    while (k < 3) {
      const rnd = Math.floor(Math.random() * shuffledWords.length)
      if (!unique.has(rnd)) {
        unique.add(rnd)
        k++
      }
    }

    const options = shuffleArray([
      ...[...unique].map((item, i) => {
        return {
          _id: nanoid(),
          option:
            defaultVocabularyQuizQuestions[rndQuestion].option === '{word_translation}'
              ? shuffledWords[item].translation.ua[0]
              : shuffledWords[item].word,
          correct: i === 0 ? true : false
        }
      })
    ])

    questions.push({
      question: generateQuestion,
      options: options
    })
  })

  return {
    title: 'Quiz',
    questions
  }
}
