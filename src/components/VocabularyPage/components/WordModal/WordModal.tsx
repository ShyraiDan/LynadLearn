import styles from './WordModal.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IWord } from '@/interfaces/Word.interface'
import { useTranslations } from 'next-intl'
import { createWord } from '@/lib/word'

export default function WordModal({ handleClose }: any) {
  const t = useTranslations('dashboard.vocabulary.modal')

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IWord>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IWord> = async (values) => {
    console.log(values)
    await createWord(values)
    handleClose()
  }

  return (
    <div className={styles.modal}>
      <h2>{t('add_new_word')}</h2>
      <p>{t('enter_word_details')}</p>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.row}>
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
            </div>
            <div>
              <label htmlFor='partOfSpeech'>{t('part_of_speech')}</label>
              <select id='partOfSpeech' {...register('part_of_speech')}>
                <option value='noun'>{t('noun')}</option>
                <option value='verb'>{t('verb')}</option>
                <option value='adjective'>{t('adjective')}</option>
                <option value='adverb'>{t('adverb')}</option>
                <option value='pronoun'>{t('pronoun')}</option>
                <option value='interjection'>{t('interjection')}</option>
                <option value='conjunction'>{t('conjunction')}</option>
                <option value='preposition'>{t('preposition')}</option>
              </select>
            </div>
          </div>
          <Input
            type='text'
            name='definition'
            id='definition'
            placeholder={t('enter_definition')}
            obj={register('definition', {
              maxLength: { value: 70, message: t('definition_maxLength') }
            })}>
            {t('definition')}
          </Input>
          {errors?.definition && <p className={styles.error}>{errors.definition.message}</p>}
          <Input
            type='text'
            name='translation'
            id='translation'
            placeholder={t('enter_translation')}
            obj={register('translation', {
              required: { value: true, message: t('transition_required') },
              maxLength: { value: 70, message: t('translation_maxLength') }
            })}>
            {t('translation')}
          </Input>
          {errors?.translation && <p className={styles.error}>{errors.translation.message}</p>}
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
          <Input
            type='text'
            name='example'
            id='example'
            placeholder={t('enter_example')}
            obj={register('example', {
              maxLength: { value: 150, message: t('example_maxLength') }
            })}>
            {t('example')}
          </Input>
          {errors?.example && <p className={styles.error}>{errors.example.message}</p>}
          <Button type='submit'>{t('add_word')}</Button>
        </div>
      </form>
    </div>
  )
}
