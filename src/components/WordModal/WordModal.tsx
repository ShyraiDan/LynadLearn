import styles from './WordModal.module.scss'
import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IWord, IDefinitionWithId } from '@/interfaces/Word.interface'
import { useTranslations } from 'next-intl'
import { createWord, updateWordById } from '@/lib/word'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Badge } from '@/components/Badge/Badge'
import { AddEditDefinitionForm } from './AddEditDefinitionForm/AddEditDefinitionForm'
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { H2, H6, P } from '@/components/ui/Typography/Typography'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'

import { FaPlus, FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

interface IWordModal {
  handleClose: (e?: any) => void
  word?: IWord
}

export default function WordModal({ handleClose, word }: IWordModal) {
  const t = useTranslations('dashboard.vocabulary.modal')
  const { id } = useParams() as { id: string }
  const [translations, setTranslations] = useState('')
  const [translationsList, setTranslationsList] = useState<string[]>(word?.translation?.ua || [])
  const [results, setResults] = useState<IDefinitionWithId[]>(
    word?.results.map((item) => {
      return {
        ...item,
        id: nanoid()
      }
    }) || []
  )
  const [isEdit, setEdit] = useState<number | null>(null)

  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit
  } = useForm<IWord>({
    mode: 'onSubmit',
    defaultValues: {
      word: word?.word || '',
      pronunciation: word?.pronunciation || '',
      translation: {
        ua: word?.translation?.ua || []
      },
      results: word?.results || []
    }
  })

  const onSubmit: SubmitHandler<IWord> = async (values) => {
    if (translationsList.length === 0) {
      return
    }

    values.listId = id as string

    if (word) {
      word.word = values.word
      word.pronunciation = values.pronunciation
      word.translation.ua = [...translationsList]
      word.results = [...results]
      word.listId = id as string
      const res = await updateWordById(word)

      if (res.success) {
        toast.success(t('successfully_word_update'), {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-white-100'
        })

        handleClose()
      } else {
        toast.error(t('error_word_update'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    } else {
      const res = await createWord({
        word: values.word,
        pronunciation: values.pronunciation,
        translation: {
          ua: [...translationsList]
        },
        results: [...results],
        listId: id as string
      })

      if (res.success) {
        toast.success(t('successfully_word_create'), {
          duration: 3000,
          className: 'border border-green-100 bg-green-100 text-white-100'
        })

        handleClose()
      } else {
        toast.error(t('error_word_create'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    }
  }

  const handleAddTranslation = () => {
    if (translations) {
      setTranslationsList((state) => [...state, translations])
      setTranslations('')
    }
  }

  const handleAddDefinition = (obj: IDefinitionWithId) => {
    console.log(obj)

    if (isEdit !== null) {
      setResults((state) => state.map((item) => (item.id === obj.id ? obj : item)))
    } else {
      setResults((state) => [...state, obj])
    }
    setEdit(null)
  }

  const handleDeleteDefinition = (id: string) => {
    setResults((state) => state.filter((item) => item.id !== id))
  }

  const handleDeleteTranslation = (item: string) => {
    setTranslationsList((state) => state.filter((i) => i !== item))
  }
  return (
    <>
      <div className={styles.modal}>
        <H2 className="mb-2 text-3xl font-bold dark:text-grey-600">{word ? t('edit_word') : t('add_new_word')}</H2>
        <H6 className="mb-7 dark:text-grey-600">{word ? t('change_details') : t('enter_word_details')}</H6>
        <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="word"
              id="word"
              placeholder={t('your_word')}
              obj={register('word', {
                required: { value: true, message: t('field_is_required') },
                maxLength: { value: 30, message: t('word_maxLength') }
              })}
            >
              {t('your_word')}
            </Input>
            {errors?.word && (
              <P className="font-semibold mb-2 first:mt-0 text-[1rem] text-red mt-1.5 text-sm dark:!text-red">
                {errors.word.message}
              </P>
            )}
            <Input
              type="text"
              name="pronunciation"
              id="pronunciation"
              placeholder={t('enter_pronunciation')}
              obj={register('pronunciation', {
                maxLength: { value: 30, message: t('pronunciation_maxLength') }
              })}
            >
              {t('pronunciation')}
            </Input>
            {errors?.pronunciation && (
              <P className="font-semibold mb-2 first:mt-0 text-[1rem] text-red mt-1.5 text-sm dark:!text-red">
                {errors.pronunciation.message}
              </P>
            )}

            <P className="mt-4 block text-[1rem] font-semibold mb-2 first:mt-0 dark:text-grey-600">{t('definition')}</P>
            {results.map((item, index) => (
              <>
                <div className={twMerge(styles.definition, 'dark:!bg-[#1D2D4D]')} key={item.definition}>
                  <div>
                    <div className={styles.content}>
                      <div className={styles.meaning}>
                        <div className={styles.title}>
                          <div className={styles.number}>{index + 1}</div>
                          <P className="m-0 ml-3 font-medium text-lg dark:text-grey-600">{item.definition}</P>
                        </div>
                        <div className={styles.icons}>
                          <MdEdit
                            className="transition-all duration-[.3s] cursor-pointer lg:hover:text-purple-100 dark:text-grey-600"
                            onClick={() => setEdit(index)}
                          />
                          <FaTrash
                            className="transition-all duration-[.3s] cursor-pointer lg:hover:text-red dark:text-grey-600 "
                            onClick={() => handleDeleteDefinition(item.id)}
                          />
                        </div>
                      </div>
                      <Badge className="w-min text-sm mt-2" part={item.part_of_speech} />
                      <div className={styles.synonyms}>
                        {item.synonyms.map((synonym, i) => (
                          <Button key={i}>
                            <span>≈</span> {synonym}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.exams}>
                      <ul className={styles.content}>
                        {item.examples.map((item: string, index: number) => (
                          <li key={index}>
                            <span className={styles.dot}></span>
                            <P className="m-0 text-lg font-semibold first-letter:uppercase dark:text-grey-600">
                              {item}
                            </P>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {index === isEdit && (
                  <AddEditDefinitionForm isEdit definition={item} allowedAction={handleAddDefinition} />
                )}
              </>
            ))}
            <AddEditDefinitionForm allowedAction={handleAddDefinition} />
            <P className="mt-4 text-[1rem] block font-semibold mb-2 first:mt-0 dark:text-grey-600">
              {t('translation')}
            </P>
            <div className="mb-2">
              <div className={styles.translations}>
                {translationsList.map((item) => (
                  <div className={styles.card} key={item}>
                    {item}
                    <span onClick={() => handleDeleteTranslation(item)}>
                      <FaTrash />
                    </span>
                  </div>
                ))}
                <div className={styles.controls}>
                  <Input
                    type="text"
                    name="example"
                    id="example"
                    placeholder={t('enter_example')}
                    onChange={(e) => setTranslations(e.target.value)}
                    value={translations}
                  />
                  <Button className={styles['add-translation']} type="button" onClick={() => handleAddTranslation()}>
                    <FaPlus size={20} />
                  </Button>
                </div>
              </div>
              {isSubmitted &&
                translationsList.length === 0 &&
                (translations ? (
                  <P className="block font-semibold first:mt-0 dark:text-red mt-1.5 mb-2 text-[14px]">
                    Submit word translation
                  </P>
                ) : (
                  <P className="block font-semibold first:mt-0 dark:text-red mt-1.5 mb-2 text-[14px]">
                    Add word translation
                  </P>
                ))}
            </div>
            <Button onClick={handleSubmit(onSubmit)}>{word ? t('edit_word') : t('add_word')}</Button>
          </div>
        </form>
      </div>

      <SnackBar />
    </>
  )
}
