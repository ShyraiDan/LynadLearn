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
      await updateWordById(word)
    } else {
      await createWord({
        word: values.word,
        pronunciation: values.pronunciation,
        translation: {
          ua: [...translationsList]
        },
        results: [...results],
        listId: id as string
      })
    }

    handleClose()
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
    <div className={styles.modal}>
      <h2 className="dark:text-grey-600">{word ? t('edit_word') : t('add_new_word')}</h2>
      <p className="dark:text-grey-600">{word ? t('change_details') : t('enter_word_details')}</p>
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
          {errors?.word && <p className={styles.error}>{errors.word.message}</p>}
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
          {errors?.pronunciation && <p className={styles.error}>{errors.pronunciation.message}</p>}

          <p className="dark:text-grey-600">{t('definition')}</p>
          {results.map((item, index) => (
            <>
              <div className={twMerge(styles.definition, 'dark:!bg-[#1D2D4D]')} key={item.definition}>
                <div>
                  <div className={styles.content}>
                    <div className={styles.meaning}>
                      <div className={styles.title}>
                        <div className={styles.number}>{index + 1}</div>
                        <p className="dark:text-grey-600">{item.definition}</p>
                      </div>
                      <div className={styles.icons}>
                        <MdEdit
                          className="transition-all duration-[.3s] cursor-pointer hover:text-purple-100 dark:text-grey-600"
                          onClick={() => setEdit(index)}
                        />
                        <FaTrash
                          className="transition-all duration-[.3s] cursor-pointer hover:text-red dark:text-grey-600 "
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
                      {item.examples.map((item: string, index: number, i) => (
                        <li key={index}>
                          <span className={styles.dot}></span>
                          <p className="dark:text-grey-600">{item}</p>
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
          <p className="dark:text-grey-600">{t('translation')}</p>
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
                <p className="dark:text-red !mt-1.5 !mb-2 text-[14px]">Submit word translation</p>
              ) : (
                <p className="dark:text-red !mt-1.5 !mb-2 text-[14px]">Add word translation</p>
              ))}
          </div>
          <Button onClick={handleSubmit(onSubmit)}>{word ? t('edit_word') : t('add_word')}</Button>
        </div>
      </form>
    </div>
  )
}
