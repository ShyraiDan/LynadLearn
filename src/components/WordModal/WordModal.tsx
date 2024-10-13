import styles from './WordModal.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IWord, IDefinition } from '@/interfaces/Word.interface'
import { useTranslations } from 'next-intl'
import { createWord, updateWordById } from '@/lib/word'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Badge } from '@/components/Badge/Badge'
import { AddEditDefinitionForm } from './AddEditDefinitionForm/AddEditDefinitionForm'

import { FaPlus } from 'react-icons/fa'

interface IWordModal {
  handleClose: (e?: any) => void
  word?: IWord
}

export default function WordModal({ handleClose, word }: IWordModal) {
  const t = useTranslations('dashboard.vocabulary.modal')
  const params = useParams()
  const { id } = params
  const [translations, setTranslations] = useState('')
  const [translationsList, setTranslationsList] = useState<string[]>(word?.translation?.ua || [])
  const [results, setResults] = useState<IDefinition[]>(word?.results || [])

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IWord>({
    mode: 'onBlur',
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
    // values.listId = id as string

    if (word) {
      word.word = values.word
      word.pronunciation = values.pronunciation
      word.translation.ua = [...translationsList]
      word.results = [...results]

      // await updateWordById(word)
    }
    // else {
    // await createWord(values)
    // handleClose()

    console.log('submitting', word)
  }

  const handleAddTranslation = () => {
    if (translations) {
      setTranslationsList((state) => [...state, translations])
      setTranslations('')
    }
  }

  const handleAddDefinition = (obj: IDefinition) => {
    setResults((state) => [...state, obj])
  }

  return (
    <div className={styles.modal}>
      <h2>{word ? t('edit_word') : t('add_new_word')}</h2>
      <p>{word ? t('change_details') : t('enter_word_details')}</p>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type='text'
            name='word'
            id='word'
            placeholder={t('your_word')}
            obj={register('word', {
              required: { value: true, message: t('field_is_required') },
              maxLength: { value: 30, message: t('word_maxLength') }
            })}>
            {t('your_word')}
          </Input>
          {errors?.word && <p className={styles.error}>{errors.word.message}</p>}
          <Input
            type='text'
            name='pronunciation'
            id='pronunciation'
            placeholder={t('enter_pronunciation')}
            obj={register('pronunciation', {
              maxLength: { value: 30, message: t('pronunciation_maxLength') }
            })}>
            {t('pronunciation')}
          </Input>
          {errors?.pronunciation && <p className={styles.error}>{errors.pronunciation.message}</p>}

          <p>{t('definition')}</p>
          {results.map((item, index) => (
            <div className={styles.definition} key={item.definition}>
              <div>
                <div className={styles.content}>
                  <div className={styles.meaning}>
                    <div className={styles.number}>{index + 1}</div>
                    <p>{item.definition}</p>
                  </div>
                  <Badge className='w-min text-sm mt-2' part={item.part_of_speech} />
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
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <AddEditDefinitionForm allowedAction={handleAddDefinition} />
          <p>{t('translation')}</p>
          <div className={styles.translations}>
            {translationsList.map((item) => (
              <div className={styles.card} key={item}>
                {item}
              </div>
            ))}
            <div className={styles.controls}>
              <Input
                type='text'
                name='example'
                id='example'
                placeholder={t('enter_example')}
                onChange={(e) => setTranslations(e.target.value)}
                value={translations}
              />

              <Button className={styles['add-translation']} type='button' onClick={() => handleAddTranslation()}>
                <FaPlus size={20} />
              </Button>
            </div>
          </div>
          <Button type='submit'>{word ? t('edit_word') : t('add_word')}</Button>
        </div>
      </form>
    </div>
  )
}
