'use client'

import Button from '@/components/ui/Button/Button'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Input } from '@/components/ui/Input/Input'
import { IQuestion, IQuizOption } from '@/interfaces/Quiz.interface'
import { H3, P } from '@/components/ui/Typography/Typography'
import { nanoid } from 'nanoid'

import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

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

  const [isAddQuestion, setAddQuestion] = useState<boolean>(false)
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)

  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<IQuizOption[]>([
    { option: '', correct: false },
    { option: '', correct: false }
  ])

  const handleSaveQuiz = async () => {
    allowedAction(quiz ?? [])
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index].option = value
    setOptions(newOptions)
  }

  const handleCorrectChange = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      correct: i === index
    }))
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, { option: '', correct: false }])
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
  }

  const handleAddQuestion = () => {
    const optionsWithId = options.map((option) => ({
      ...option,
      _id: nanoid()
    }))

    const newQuestion: IQuestion = {
      question,
      options: optionsWithId
    }

    setQuiz((state) => (state ? [...state, newQuestion] : [newQuestion]))
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
                placeholder="Enter question"
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
                  className="font-bold transition-all ease-in duration-150 !bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 lg:hover:border-red lg:hover:!text-red dark:lg:hover:!border-red dark:lg:hover:!text-red"
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
                  className="cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 lg:hover:fill-purple-100 dark:lg:hover:fill-purple-100"
                  onClick={() => {
                    setEditQuestion({ index, question })
                    setCorrectAnswer(question.options.findIndex((option) => option.correct))
                  }}
                />
                <FaTrash
                  className="cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 lg:hover:fill-red dark:lg:hover:fill-red"
                  onClick={() => setQuiz((prev) => prev && { ...prev, questions: prev.filter((_, i) => i !== index) })}
                />
              </div>
            </>
          )}
        </div>
      ))}

      <div className="mb-4">
        {isAddQuestion ? (
          <>
            <div className="mb-4">
              <Input
                type="text"
                name="add-question-title"
                id="add-question-title"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              >
                Enter question
              </Input>
            </div>

            <div className="mb-4">
              <h4>Options:</h4>
              {options.map((opt, index) => (
                <div key={index} className="flex items-center mb-2">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="correct"
                      checked={opt.correct}
                      onChange={() => handleCorrectChange(index)}
                    />
                  </label>

                  <Input
                    type="text"
                    name={`new-option-${index}`}
                    value={opt.option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Вариант ${index + 1}`}
                  />

                  <button onClick={() => removeOption(index)} disabled={options.length <= 2} className="ml-4">
                    <FaTrash />
                  </button>
                </div>
              ))}
              <Button className="!rounded" onClick={addOption}>
                Добавить вариант
              </Button>
            </div>

            <Button
              className="!rounded w-full"
              type="button"
              onClick={() => {
                handleAddQuestion()

                setAddQuestion(false)
              }}
            >
              Save question
            </Button>
          </>
        ) : (
          <Button
            className="!rounded w-full"
            type="button"
            onClick={() => {
              setAddQuestion(true)
            }}
          >
            Add question
          </Button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <Button className="!rounded" type="button" onClick={handleSaveQuiz}>
          Save Quiz
        </Button>
        <Button
          type="button"
          className="!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 lg:hover:border-red lg:hover:!text-red dark:lg:hover:!border-red dark:lg:hover:!text-red"
          onClick={handleClose}
        >
          Close Quiz
        </Button>
      </div>
    </div>
  )
}
