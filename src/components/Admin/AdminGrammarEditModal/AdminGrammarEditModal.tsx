'use client'

import { Modal } from '@/components/ui/Modal/Modal'

import { MdEdit } from 'react-icons/md'
import { useState } from 'react'
import { removeScrollBar } from '@/constants/shared'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

interface IAdminGrammarEditModal {
  data: IGrammarTopic
}

export const AdminGrammarEditModal = ({ data }: IAdminGrammarEditModal) => {
  const [isFinished, setIsFinished] = useState(false)
  const [level, setLevel] = useState(data ? data.level : '')

  const showModal = () => {
    setIsFinished((state) => !state)
    removeScrollBar(isFinished)
  }

  const {
    register,
    formState: { errors },
    handleSubmit

    // reset
  } = useForm<IGrammarTopic>({
    mode: 'onSubmit',
    defaultValues: {
      // level: data.level,
      title: data.title,
      titleUa: data.titleUa,
      data: data.data || []
    }
  })

  const onSubmit: SubmitHandler<IGrammarTopic> = async (values) => {
    // await sendContacts(values)
    // toast.success(t('Contact_Us.form_submitted'), { duration: 3000 })
    // reset()
  }

  return (
    <>
      <MdEdit
        size={16}
        onClick={() => showModal()}
        className='cursor-pointer duration-150 transition-all ease-in hover:fill-purple-100'
      />
      <Modal isOpen={isFinished} handleClose={() => showModal()}>
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            name='title'
            id='title'
            placeholder='Enter title'
            obj={register('title', {
              required: { value: true, message: 'required' }
            })}>
            Grammar topic title
          </Input>
          {errors?.title && <p className='text-red'>{errors.title.message}</p>}
          <Input
            type='text'
            name='titleUa'
            id='titleUa'
            placeholder='Enter Ukrainian title'
            obj={register('titleUa', {
              required: { value: true, message: 'required' }
            })}>
            Ukrainian grammar topic title
          </Input>
          {errors?.title && <p className='text-red'>{errors.title.message}</p>}
          <select
            id='level'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={'dark:bg-[#17294c] dark:ml-[1px] dark:!border-[#ffffff20] dark:!text-grey-600'}>
            <option value='A1-A2'>Pre-Intermediate</option>
            <option value='B1'>Intermediate</option>
            <option value='B2'>Upper-Intermediate</option>
            <option value='C1'>Advanced</option>
            <option value='C2'>Proficiency</option>
          </select>

          {data.data.description.map((item, i) => (
            <div
              className='my-4 shadow-md bg-white-100 p-2 flex flex-wrap flex-col rounded-3xl justify-center w-[100%] md:justify-start'
              key={item}>
              {item}
            </div>
          ))}

          <Button type='submit'>Submit</Button>
        </form>
      </Modal>
    </>
  )
}
