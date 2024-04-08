import styles from './WordModal.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IWord } from '@/interfaces/Word.interface'

export default function WordModal() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IWord>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IWord> = async (values) => {
    console.log(values)
  }

  return (
    <div className={styles.modal}>
      <h2>Add a new word</h2>
      <p>Enter details of the new word</p>
      <form action='' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.row}>
            <div>
              <Input
                type='text'
                name='word'
                id='word'
                placeholder={'Your word'}
                obj={register('word', {
                  required: { value: true, message: 'This is required field' },
                  maxLength: { value: 30, message: 'Word must be less than 30 characters' }
                })}>
                {'Your word'}
              </Input>
              {errors?.word && <p className={styles.error}>{errors.word.message}</p>}
            </div>
            <div>
              <label htmlFor='partOfSpeech'>Part of speech</label>
              <select id='partOfSpeech' {...register('part_of_speech')}>
                <option value='noun'>Noun</option>
                <option value='verb'>Verb</option>
                <option value='adjective'>Adjective</option>
                <option value='adverb'>Adverb</option>
                <option value='pronoun'>Pronoun</option>
                <option value='interjection'>Interjection</option>
                <option value='conjunction'>Conjunction</option>
                <option value='preposition'>Preposition</option>
              </select>
            </div>
          </div>
          <Input
            type='text'
            name='definition'
            id='definition'
            placeholder={'Enter definition'}
            obj={register('definition', {
              maxLength: { value: 70, message: 'Translation must be less than 70 characters' }
            })}>
            {'Definition'}
          </Input>
          {errors?.definition && <p className={styles.error}>{errors.definition.message}</p>}
          <Input
            type='text'
            name='translation'
            id='translation'
            placeholder={'Enter translation'}
            obj={register('translation', {
              required: { value: true, message: 'Translation is required field' },
              maxLength: { value: 70, message: 'Translation must be less than 70 characters' }
            })}>
            {'Translation'}
          </Input>
          {errors?.translation && <p className={styles.error}>{errors.translation.message}</p>}
          <Input
            type='text'
            name='pronunciation'
            id='pronunciation'
            placeholder={'Enter pronunciation'}
            obj={register('pronunciation', {
              maxLength: { value: 30, message: 'Pronunciation must be less than 30 characters' }
            })}>
            {'Pronunciation'}
          </Input>
          {errors?.pronunciation && <p className={styles.error}>{errors.pronunciation.message}</p>}
          <Input
            type='text'
            name='example'
            id='example'
            placeholder={'Enter example'}
            obj={register('example', {
              maxLength: { value: 150, message: 'Example must be less than 150 characters' }
            })}>
            {'Example'}
          </Input>
          {errors?.example && <p className={styles.error}>{errors.example.message}</p>}
          <Button type='submit'>{'Add word'}</Button>
        </div>
      </form>
    </div>
  )
}
