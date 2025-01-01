'use client'

import { useState } from 'react'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import TextArea from '@/components/ui/TextArea/TextArea'
import { IGrammarExample } from '@/interfaces/Grammar.interface'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { addSingleGrammar, updateSingleGrammar } from '@/lib/grammar'
import { useRouter } from 'next/navigation'

import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import Link from 'next/link'

interface IAdminGrammarEditModal {
  data?: IGrammarTopic
}

export const AdminGrammarAddEditForm = ({ data }: IAdminGrammarEditModal) => {
  const router = useRouter()

  const [level, setLevel] = useState(data ? data.level : 'A1-A2')
  const [isEditDescription, setEditDescription] = useState<number | null>(null)
  const [isEditRule, setEditRule] = useState<number | null>(null)
  const [isEditExample, setEditExample] = useState<{ rule: number; example: number } | null>(null)

  const {
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    reset
  } = useForm<IGrammarTopic>({
    mode: 'onSubmit',
    defaultValues: {
      level: data ? data.level : '',
      title: data ? data.title : '',
      titleUa: data ? data.titleUa : '',
      data: {
        description: data ? data.data.description : [],
        example: data ? data.data.example : []
      }
    }
  })

  const {
    fields: descriptionFields,
    append: descriptionAppend,
    update: descriptionUpdate,
    remove: descriptionRemove
  } = useFieldArray({
    control,
    name: 'data.description'
  })

  const {
    fields: ruleFields,
    append: ruleAppend,
    update: ruleUpdate,
    remove: ruleRemove
  } = useFieldArray({
    control,
    name: 'data.example'
  })

  // TODO: Fix toaster appearance after edit of creating grammar topic
  // TODO: Add field to connect grammar topic with quiz
  // TODO: Add error handling for this form

  const onSubmit: SubmitHandler<IGrammarTopic> = (values) => {
    if (!data) {
      console.log({ ...values, level })

      addSingleGrammar({ ...values, level }).then((res) => {
        if (res.success) {
          toast.success('Grammar topic created', {
            duration: 3000,
            className: 'border text-white-100 border-green-100 bg-green-100'
          })

          reset()
        } else {
          toast.success('Error updating grammar topic', {
            duration: 3000,
            className: 'border text-white-100 border-red bg-red'
          })
        }
      })

      router.push('/admin/dashboard/grammar')
    } else {
      const updatedGrammar = { ...data, ...values, level }

      updateSingleGrammar(updatedGrammar).then((res) => {
        if (res.success) {
          toast.success('Grammar topic updated', {
            duration: 3000,
            className: 'border text-white-100 border-green-100 bg-green-100'
          })

          reset(updatedGrammar)
        } else {
          toast.success('Error updating grammar topic', {
            duration: 3000,
            className: 'border text-white-100 border-red bg-red'
          })
        }
      })

      router.push(`/admin/dashboard/grammar/${data._id}`)
    }
  }

  const handleAddParagraph = () => {
    const newDescription = { id: nanoid(), en: '', ua: '' }
    descriptionAppend(newDescription)
    setEditDescription(descriptionFields.length)
  }

  const handleAddRule = () => {
    const item = { title: '', titleUa: '', description: '', descriptionUa: '', examples: [] }
    ruleAppend(item)
    setEditRule(ruleFields.length)
  }

  //TODO: Fix modal size for small screens

  return (
    <>
      <div className='p-4 h-full overflow-y-auto'>
        <h1 className='text-center text-xl font-bold'>{data ? 'Edit' : 'Add'} grammar topic</h1>
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Controller
              name='title'
              control={control}
              rules={{ required: { value: true, message: 'required' } }}
              render={({ field }) => (
                <Input type='text' id='title' placeholder='Enter title' {...field}>
                  Grammar topic title
                </Input>
              )}
            />

            {errors?.title && <p className='text-red'>{errors.title.message}</p>}
          </div>
          <div className='mb-4'>
            <Controller
              name='titleUa'
              control={control}
              rules={{ required: { value: true, message: 'required' } }}
              render={({ field }) => (
                <Input type='text' id='titleUa' placeholder='Enter Ukrainian title' {...field}>
                  Ukrainian grammar topic title
                </Input>
              )}
            />
            {errors?.title && <p className='text-red'>{errors.title.message}</p>}
          </div>

          <label htmlFor='level' className='block font-semibold mb-2 dark:text-grey-600'>
            Grammar topic level
          </label>
          <select
            id='level'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className='font-medium text-blue-350 opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full mb-4 dark:bg-[#17294c] dark:ml-[1px] dark:!border-[#ffffff20] dark:!text-grey-600'>
            <option value='A1-A2'>Pre-Intermediate</option>
            <option value='B1'>Intermediate</option>
            <option value='B2'>Upper-Intermediate</option>
            <option value='C1'>Advanced</option>
            <option value='C2'>Proficiency</option>
          </select>

          <p className='font-semibold mb-2 dark:text-grey-600'>Enter description</p>

          {descriptionFields.map((item, i) => (
            <div
              className='bg-[#F7F9FC] rounded-3xl shadow-md w-full px-2 py-4 mb-2 sm:px-4 md:px-8 md:py-6 dark:!bg-[#1D2D4D]'
              key={'paragraph-' + i}>
              <div className='flex justify-between mb-2'>
                <p className='font-semibold dark:text-grey-600'>Paragraph {i + 1}</p>
                {i !== isEditDescription && (
                  <div className='flex gap-4 items-center'>
                    <MdEdit
                      className='cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-purple-100 dark:hover:fill-purple-100'
                      onClick={() => setEditDescription(i)}
                    />
                    <FaTrash
                      className='cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-red dark:hover:fill-red'
                      onClick={() => descriptionRemove(i)}
                    />
                  </div>
                )}
              </div>

              {i !== isEditDescription ? (
                <>
                  <p className='my-2 dark:text-grey-600'>{item.en}</p>
                  <p className='my-2 dark:text-grey-600'>{item.ua}</p>
                </>
              ) : (
                <>
                  <label htmlFor='grammar-description' className='font-semibold my-2 dark:text-grey-600'>
                    Enter description
                  </label>
                  <Controller
                    name={`data.description.${i}.en`}
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        id='grammar-description'
                        placeholder='Enter description'
                        className='!border !border-solid !border-grey-400 my-2 font-medium text-blue-350 opacity-90 px-3 py-1.5 rounded w-full dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600'
                        {...field}
                      />
                    )}
                  />
                  <label htmlFor='grammar-description-ua' className='font-semibold my-2 dark:text-grey-600'>
                    Enter ukrainian description
                  </label>
                  <Controller
                    name={`data.description.${i}.ua`}
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        id='grammar-description-ua'
                        placeholder='Enter ukrainian description'
                        className='!border !border-solid !border-grey-400 my-2 font-medium text-blue-350 opacity-90 px-3 py-1.5 rounded w-full dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600'
                        {...field}
                      />
                    )}
                  />
                  <div className='flex gap-4'>
                    <Button
                      type='button'
                      onClick={() => {
                        const { en, ua, id } = getValues(`data.description.${i}`)

                        if (!en || !ua) return

                        console.log('hello')

                        descriptionUpdate(i, { id, en, ua })
                        setEditDescription(null)
                        // TODO: Add a function for saving edited description add an error when the eng and ua value is empty
                      }}
                      className='!rounded-md'>
                      Confirm
                    </Button>
                    <Button
                      type='button'
                      className='!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red'
                      onClick={() => {
                        if (!descriptionFields[i].en || !descriptionFields[i].ua) {
                          descriptionRemove(i)
                        }
                        setEditDescription(null)
                      }}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}

          <Button
            type='button'
            className='w-full !rounded mb-4'
            onClick={() => {
              // const lastDescription = descriptionFields[descriptionFields.length - 1]

              // if (lastDescription) {
              //   if (lastDescription.en === '' && lastDescription.ua === '') return
              //   handleAddParagraph()
              //   return
              // }

              // handleAddParagraph()

              const lastDescription = descriptionFields.at(-1)

              if (!lastDescription || lastDescription.en !== '' || lastDescription.ua !== '') {
                handleAddParagraph()
              }
            }}>
            Add paragraph
          </Button>

          {ruleFields.map((example, i) => (
            <div
              className='bg-[#F7F9FC] rounded-3xl shadow-md w-full px-2 py-4 mb-2 sm:px-4 md:px-8 md:py-6 dark:!bg-[#1D2D4D]'
              key={`rule-${i}`}>
              <div className='flex justify-between mb-2'>
                <p className='font-semibold dark:text-grey-600'>Rule {i + 1}</p>
                {isEditRule !== i && (
                  <div className='flex gap-4 items-center'>
                    <MdEdit
                      className='cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-purple-100 dark:hover:fill-purple-100'
                      onClick={() => setEditRule(i)}
                    />
                    <FaTrash
                      className='cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-red dark:hover:fill-red'
                      onClick={() => ruleRemove(i)}
                    />
                  </div>
                )}
              </div>
              {isEditRule !== i ? (
                <>
                  <p className='font-semibold my-2 dark:text-grey-600'>Title</p>
                  <p className='my-2 dark:text-grey-600'>{example.title}</p>
                  <p className='my-2 dark:text-grey-600'>{example.titleUa}</p>
                  <p className='font-semibold my-2 dark:text-grey-600'>Description</p>
                  <p className='my-2 dark:text-grey-600'>{example.description}</p>
                  <p className='my-2 dark:text-grey-600'>{example.descriptionUa}</p>
                </>
              ) : (
                <>
                  <Controller
                    name={`data.example.${i}.title`}
                    control={control}
                    render={({ field }) => (
                      <Input type='text' id='rule-title' placeholder='Enter title' {...field}>
                        Enter rule title
                      </Input>
                    )}
                  />

                  <div className='mt-2 mb-4'>
                    <Controller
                      name={`data.example.${i}.titleUa`}
                      control={control}
                      render={({ field }) => (
                        <Input type='text' id='rule-title-ua' placeholder='Enter ukrainian title' {...field}>
                          Enter ukrainian rule title
                        </Input>
                      )}
                    />
                  </div>
                  <label htmlFor='rule-description' className='font-semibold my-2 dark:text-grey-600'>
                    Enter description
                  </label>
                  <Controller
                    name={`data.example.${i}.description`}
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        placeholder='Enter description'
                        id='rule-description'
                        className='!border !border-solid !border-grey-400 my-2 font-medium text-blue-350 opacity-90 px-3 py-1.5 rounded w-full dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600'
                        {...field}
                      />
                    )}
                  />
                  <label htmlFor='rule-description-ua' className='font-semibold my-2 dark:text-grey-600'>
                    Enter ukrainian description
                  </label>
                  <Controller
                    name={`data.example.${i}.descriptionUa`}
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        placeholder='Enter ukrainian description'
                        id='rule-description-ua'
                        className='!border !border-solid !border-grey-400 my-2 font-medium text-blue-350 opacity-90 px-3 py-1.5 rounded w-full dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600'
                        {...field}
                      />
                    )}
                  />
                  <div className='flex gap-4 mb-4'>
                    <Button
                      type='button'
                      className='!rounded-md'
                      onClick={() => {
                        const currentValues = getValues(`data.example.${i}`)

                        if (
                          !currentValues.title ||
                          !currentValues.titleUa ||
                          !currentValues.description ||
                          !currentValues.descriptionUa
                        ) {
                          return
                        }

                        const updatedRule = {
                          ...currentValues,
                          examples: example.examples
                        }

                        ruleUpdate(i, updatedRule)
                        setEditRule(null)

                        // TODO: Add a function for saving edited example rule add an error when the eng and ua value is empty
                      }}>
                      Confirm
                    </Button>
                    <Button
                      type='button'
                      className='!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red'
                      onClick={() => {
                        if (
                          !ruleFields[i].title ||
                          !ruleFields[i].titleUa ||
                          !ruleFields[i].description ||
                          !ruleFields[i].descriptionUa
                        ) {
                          ruleRemove(i)
                        }
                        setEditRule(null)
                      }}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}

              {ruleFields[i].examples.map((item: IGrammarExample, k) => {
                const isCurrentItem = isEditExample?.example === k && isEditExample?.rule === i

                return (
                  <div key={`rule-${i}-example-${k}`} className='bg-[#e4eefc] p-4 mb-4 rounded-md dark:!bg-[#16274A]'>
                    <div className='flex justify-between mb-2'>
                      <p className='font-semibold dark:text-grey-600'>Example {k + 1}</p>
                      {!isCurrentItem && (
                        <div className='flex gap-4 items-center'>
                          <MdEdit
                            className='cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-purple-100 dark:hover:fill-purple-100'
                            onClick={() => {
                              setEditExample({
                                example: k,
                                rule: i
                              })
                            }}
                          />
                          <FaTrash
                            className='cursor-pointer transition-all ease-in-out duration-150 dark:fill-grey-600 hover:fill-red dark:hover:fill-red'
                            onClick={() => {
                              const currentRule = getValues(`data.example.${i}`)

                              ruleUpdate(i, {
                                ...currentRule,
                                examples: [...currentRule.examples.filter((_, index) => index !== k)]
                              })
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {!isCurrentItem ? (
                      <>
                        <p className='my-2 dark:text-grey-600'>{item.exampleEn}</p>
                        <p className='my-2 dark:text-grey-600'>{item.exampleUa}</p>
                      </>
                    ) : (
                      <>
                        <div className='mb-2'>
                          <Controller
                            name={`data.example.${i}.examples.${k}.exampleEn`}
                            control={control}
                            render={({ field }) => (
                              <Input type='text' id='example-en' placeholder='Enter title' {...field}>
                                Enter example
                              </Input>
                            )}
                          />
                        </div>
                        <Controller
                          name={`data.example.${i}.examples.${k}.exampleUa`}
                          control={control}
                          render={({ field }) => (
                            <Input type='text' id='example-ua' placeholder='Enter ukrainian title' {...field}>
                              Enter ukrainian example
                            </Input>
                          )}
                        />
                        <div className='flex gap-4 mt-2'>
                          <Button
                            type='button'
                            className='!rounded-md'
                            onClick={() => {
                              const currentRule = getValues(`data.example.${i}`)
                              const currentValues = getValues(`data.example.${i}.examples.${k}`)
                              if (!currentValues.exampleEn || !currentValues.exampleUa) return

                              ruleUpdate(i, {
                                ...currentRule,
                                examples: [
                                  ...currentRule.examples.slice(0, k),
                                  currentValues,
                                  ...currentRule.examples.slice(k + 1)
                                ]
                              })
                              setEditExample(null)
                              // TODO: Add a function for saving edited description add an error when the eng and ua value is empty
                            }}>
                            Confirm
                          </Button>
                          <Button
                            type='button'
                            className='!bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red'
                            onClick={() => {
                              const currentRule = getValues(`data.example.${i}`)
                              const currentValues = getValues(`data.example.${i}.examples.${k}`)
                              if (!currentValues.exampleEn || !currentValues.exampleUa) {
                                ruleUpdate(i, {
                                  ...currentRule,
                                  examples: [...currentRule.examples.slice(0, k), ...currentRule.examples.slice(k + 1)]
                                })
                              }
                              setEditExample(null)
                            }}>
                            Cancel
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
              <Button
                type='button'
                className='w-full !rounded mb-4'
                onClick={() => {
                  const currentRule = getValues(`data.example.${i}`)
                  if (
                    currentRule.examples.length > 0 &&
                    currentRule.examples[currentRule.examples.length - 1].exampleEn === '' &&
                    currentRule.examples[currentRule.examples.length - 1].exampleUa === ''
                  )
                    return
                  const item = { exampleEn: '', exampleUa: '' }
                  ruleUpdate(i, {
                    ...currentRule,
                    examples: [...currentRule.examples, item]
                  })
                  setEditExample({ example: currentRule.examples.length, rule: i })
                }}>
                Add Example
              </Button>
            </div>
          ))}

          <Button
            type='button'
            className='w-full !rounded my-4'
            onClick={() => {
              // const lastItem = ruleFields[ruleFields.length - 1]

              // if (
              //   lastItem.title === '' &&
              //   lastItem.titleUa === '' &&
              //   lastItem.description === '' &&
              //   lastItem.descriptionUa === ''
              // )
              //   return
              // const item = { title: '', titleUa: '', description: '', descriptionUa: '', examples: [] }
              // ruleAppend(item)
              // setEditRule(ruleFields.length)

              const lastItem = ruleFields.at(-1)

              if (
                !lastItem ||
                lastItem.title !== '' ||
                lastItem.titleUa !== '' ||
                lastItem.description !== '' ||
                lastItem.descriptionUa !== ''
              ) {
                handleAddRule()
              }
            }}>
            Add Rule
          </Button>

          <div className='flex gap-4'>
            <Button className='!rounded' type='submit'>
              {data ? 'Update' : 'Create'}
            </Button>
            <Link
              href={data ? `/admin/dashboard/grammar/${data._id}` : '/admin/dashboard/grammar'}
              className='font-bold transition-all ease-in duration-150 !bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red'
              onClick={() => {
                setEditDescription(null)
                setEditRule(null)
                setEditExample(null)
                // showModal()
              }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <SnackBar />
    </>
  )
}
