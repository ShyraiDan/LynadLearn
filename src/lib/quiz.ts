'use server'

import mongoose from 'mongoose'
import connectMongoDB from './mongodb'
import Quizzes, { IQuiz, IQuestion } from '@/interfaces/Quiz.interface'
import { IWord } from '@/interfaces/Word.interface'
import { shuffleArray } from '@/utils/middlewares'
import { getListById } from './lists'
import { nanoid } from 'nanoid'

// TODO rename to getGrammarQuiz
export const getSingleQuiz = async (id: string): Promise<IQuiz | null> => {
  await connectMongoDB()

  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return null
  }

  const grammar = await Quizzes.findById(id)
  const data = JSON.parse(JSON.stringify(grammar))

  return data
}

const defaultVocabularyQuizQuestions = [
  { question: 'Choose correct translation for the word {eng_word}', option: '{word_translation}' },
  { question: 'Choose word which means "{word_meaning}"', option: '{eng_word}' },
  { question: 'This word is synonym to {word_synonym}', option: '{eng_word}' },
  { question: 'Choose word which we can translate as {word_translation}', option: '{eng_word}' }
]

export const getVocabularyQuiz = async (words: IWord[], listId: string): Promise<IQuiz | null> => {
  if (!words.length) {
    return null
  }

  // const list = await getListById(listId)

  const shuffledWords: IWord[] = shuffleArray(words)
  const questions: IQuestion[] = []

  shuffledWords.forEach((word: IWord, i) => {
    // Generate question section
    const rndQuestion = Math.floor(Math.random() * defaultVocabularyQuizQuestions.length)
    let generateQuestion = defaultVocabularyQuizQuestions[rndQuestion].question

    switch (rndQuestion) {
      case 0:
        generateQuestion = generateQuestion.replace('{eng_word}', word.word)
        break
      case 1: {
        const rndMeaning = Math.floor(Math.random() * word.results.length)
        generateQuestion = generateQuestion.replace('{word_meaning}', word.results[rndMeaning].definition)
        break
      }
      case 2: {
        const rndMeaning = Math.floor(Math.random() * word.results.length)
        const rndSynonym = Math.floor(Math.random() * word.results[rndMeaning].synonyms.length)
        generateQuestion = generateQuestion.replace('{word_synonym}', word.results[rndMeaning].synonyms[rndSynonym])
        break
      }
      default: {
        const rndTranslation = Math.floor(Math.random() * word.translation.ua.length)
        generateQuestion = generateQuestion.replace('{word_translation}', word.translation.ua[rndTranslation])
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
    title: `Quiz`,
    questions
  }
}
