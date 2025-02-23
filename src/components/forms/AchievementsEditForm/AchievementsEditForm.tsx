'use client'

import { IAchievement, IAchievementsType } from '@/interfaces/Achievements.interface'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { Input } from '@/components/ui/Input/Input'
import { P } from '@/components/ui/Typography/Typography'
import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import Link from 'next/link'
import { saveFileToBucket } from '@/lib/bucket'
import { updateSingleAchievements, createSingleAchievements } from '@/lib/achievements'
import { useRouter } from 'next/navigation'

interface IAchievementsEditFormProps {
  data?: IAchievement
}

export const AchievementsEditForm = ({ data }: IAchievementsEditFormProps) => {
  const router = useRouter()

  const [type, setType] = useState(data ? data.type : 'flashcards')
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IAchievement>({
    mode: 'onSubmit',
    defaultValues: {
      title: data?.title || '',
      titleUa: data?.titleUa || '',
      description: data?.description || '',
      descriptionUa: data?.descriptionUa || '',
      target: data?.target || 0,
      type: data?.type || 'flashcards',
      image: data?.image || ''
    }
  })

  //TODO: Add validation for this form

  const onSubmit: SubmitHandler<IAchievement> = async (values) => {
    if (!file) return

    const fileName = await saveFileToBucket(file, file?.name)
    let res = {
      success: false
    }

    if (data?._id) {
      res = await updateSingleAchievements({ ...values, _id: data._id, type, image: fileName })
    } else {
      res = await createSingleAchievements({ ...values, type, image: fileName })
    }

    if (res.success) {
      toast.success('Achievement updated', { duration: 3000 })
      reset()
      router.push('/admin/dashboard/achievements')
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter achievement title"
            obj={register('title', {
              required: { value: true, message: 'Title is required' }
            })}
          >
            Title
          </Input>
          {errors?.title && (
            <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.title.message}</P>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="titleUa"
            id="titleUa"
            placeholder="Enter achievement ukrainian title"
            obj={register('titleUa', {
              required: { value: true, message: 'Ukrainian title is required' }
            })}
          >
            Ukrainian title
          </Input>
          {errors?.titleUa && (
            <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.titleUa.message}</P>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            obj={register('description', {
              required: { value: true, message: 'Description is required' }
            })}
          >
            Description
          </Input>
          {errors?.description && (
            <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.description.message}</P>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="descriptionUa"
            id="descriptionUa"
            placeholder="Enter ukrainian description"
            obj={register('descriptionUa', {
              required: { value: true, message: 'Ukrainian description is required' }
            })}
          >
            Ukrainian Description
          </Input>
          {errors?.descriptionUa && (
            <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.descriptionUa.message}</P>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="number"
            name="target"
            id="target"
            placeholder="Enter target"
            obj={register('target', {
              required: { value: true, message: 'Target is required' }
            })}
          >
            Target
          </Input>
          {errors?.target && (
            <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.target.message}</P>
          )}
        </div>
        <div>
          <label htmlFor="type" className="block font-semibold mb-2 dark:text-grey-600">
            Achievement type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as IAchievementsType)}
            className="font-medium text-blue-350 opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full mb-4 dark:bg-[#17294c] dark:ml-[1px] dark:!border-[#ffffff20] dark:!text-grey-600"
          >
            <option value="flashcards">Flashcards</option>
            <option value="quiz">Quiz</option>
            <option value="lists">Lists</option>
            <option value="words-lists">Words</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-semibold mb-2 dark:text-grey-600">
            Icon
          </label>
          <input
            id="image"
            type="file"
            accept="image/svg+xml"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />
        </div>
        <div className="flex gap-4">
          <Button className="!rounded" type="submit">
            {data ? 'Update' : 'Create'}
          </Button>

          <Link
            href="/admin/dashboard/achievements"
            // TODO: Fix href url after creating single achievement page
            // href={data ? `/admin/dashboard/achievements/${data._id}` : '/admin/dashboard/achievements'}
            className="font-bold transition-all ease-in duration-150 !bg-transparent border border-solid border-blue-200 !text-blue-200 !p-[7px] !rounded-md dark:border-white-100 dark:!text-white-100 hover:border-red hover:!text-red dark:hover:!border-red dark:hover:!text-red"
            onClick={() => setType('flashcards')}
          >
            Cancel
          </Link>
        </div>
      </form>
      <SnackBar styleClass="border border-green-100 bg-green-100 text-white-100" />
    </>
  )
}
