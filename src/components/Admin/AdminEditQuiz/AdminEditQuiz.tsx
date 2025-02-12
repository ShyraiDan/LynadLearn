'use client'

import Button from '@/components/ui/Button/Button'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/Input/Input'
import { IQuestion } from '@/interfaces/Quiz.interface'
import { H3, P } from '@/components/ui/Typography/Typography'

//Todo: This form need to work for new grammars without quizzes

interface IAdminEditQuizProps {
  questions?: IQuestion[]
  handleClose: () => void
  allowedAction: (quiz: IQuestion[]) => void
}

export const AdminEditQuiz = ({ questions, handleClose, allowedAction }: IAdminEditQuizProps) => {
  const [quiz, setQuiz] = useState<IQuestion[] | undefined>(questions)
  const [editQuestion, setEditQuestion] = useState<{
    index: number
    question: IQuestion
  } | null>(null)
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)

  const handleSaveQuiz = async () => {
    allowedAction(quiz ?? [])
  }

  return (
    <div>
      <H3 className="font-semibold mb-2 dark:text-grey-600">Grammar Quiz</H3>
      {quiz?.map((question, index) => (
        <div
          key={`${question.question}-${index}`}
          className="relative bg-[#F7F9FC] rounded-3xl shadow-md w-full px-2 py-4 mb-2 sm:px-4 md:px-8 md:py-6 dark:!bg-[#1D2D4D]"
        >
          {editQuestion?.index === index ? (
            <>
              <Input
                type="text"
                name={`question-${index}-title`}
                id="rule-title-ua"
                placeholder="Enter ukrainian title"
                value={editQuestion.question.question}
                onChange={(e) =>
                  setEditQuestion({ ...editQuestion, question: { ...editQuestion.question, question: e.target.value } })
                }
              >
                Enter question
              </Input>
              <div className="flex flex-col gap-2 mt-4">
                {question.options.map((option, k) => (
                  <label
                    className="flex items-center gap-2 font-bold dark:text-grey-600"
                    key={`${option.option}-${k}`}
                    htmlFor={`option-${k}`}
                  >
                    <input
                      type="radio"
                      checked={correctAnswer === k}
                      name={`question-${index}-option`}
                      id={`option-${k}`}
                      onChange={(e) => {
                        if (e.target.value) {
                          setCorrectAnswer(k)
                        }
                      }}
                    />
                    <Input
                      type="text"
                      name={`question-${index}-option-${k}`}
                      value={editQuestion.question.options[k].option}
                      onChange={(e) => {
                        setEditQuestion({
                          ...editQuestion,
                          question: {
                            ...editQuestion.question,
                            options: editQuestion.question.options.map((option, indx) => ({
                              ...option,
                              option: k === indx ? e.target.value : option.option
                            }))
                          }
                        })
                      }}
                    />
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  className="!rounded-md"
                  type="button"
                  onClick={() => {
                    setQuiz((state) =>
                      state?.map((question, i) => {
                        if (i === index) {
                          return editQuestion.question
                        }
                        return question
                      })
                    )

                    setEditQuestion(null)
                    setCorrectAnswer(null)
                  }}
                >
                  Save
                </Button>
                <Button
                  className="font-bold transition-all ease-in duration-150 !bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red"
                  onClick={() => {
                    setEditQuestion(null)
                    setCorrectAnswer(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <H3 className="font-bold mb-3 dark:text-grey-600">{question.question}</H3>

              {question.options.map((option, index) => (
                <P
                  key={`${question.question}-${index}`}
                  className={twMerge('font-bold', option.correct ? 'text-green-100' : 'text-red')}
                >
                  {option.option}
                </P>
              ))}

              <div className="flex items-center justify-center gap-2 absolute top-2 right-2 rounded-lg px-2 py-2">
                <MdEdit
                  className="cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-purple-100 dark:hover:fill-purple-100"
                  onClick={() => {
                    setEditQuestion({ index, question })
                    setCorrectAnswer(question.options.findIndex((option) => option.correct))
                  }}
                />
                <FaTrash
                  className="cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-red dark:hover:fill-red"
                  onClick={() => setQuiz((prev) => prev && { ...prev, questions: prev.filter((_, i) => i !== index) })}
                />
              </div>
            </>
          )}
        </div>
      ))}
      <div className="flex gap-4 mb-4">
        <Button className="!rounded" type="button" onClick={handleSaveQuiz}>
          Save Quiz
        </Button>
        <Button
          type="button"
          className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red"
          onClick={handleClose}
        >
          Close Quiz
        </Button>
      </div>
    </div>
  )
}
