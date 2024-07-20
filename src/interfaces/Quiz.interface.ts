import mongoose, { Schema } from 'mongoose'

export interface IQuiz {
  title: string
  questions: {
    question: string
    options: {
      option: string
      correct: boolean
    }[]
  }[]
}

const quizzesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          option: {
            type: String,
            required: true
          },
          correct: {
            type: Boolean,
            required: true
          }
        }
      ]
    }
  ]
})

const Quizzes = mongoose.models.Quizzes || mongoose.model('Quizzes', quizzesSchema)
export default Quizzes
