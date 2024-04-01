import styles from './WordModal.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

export default function WordModal() {
  return (
    <div className={styles.modal}>
      <h2>Add a new word</h2>
      <p>Enter details of the new word</p>
      <form action='' className={styles.form}>
        <div>
          <div className={styles.row}>
            <div>
              <Input type='text' name='word' id='word' placeholder={'Your word'}>
                {'Your word'}
              </Input>
            </div>
            <div>
              <label htmlFor='partOfSpeech'>Part of speech</label>
              <select name='partOfSpeech' id='partOfSpeech'>
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
          <Input type='text' name='definition' id='definition' placeholder={'Enter definition'}>
            {'Definition'}
          </Input>
          <Input type='text' name='translation' id='translation' placeholder={'Enter translation'}>
            {'Translation'}
          </Input>
          <Input type='text' name='pronunciation' id='pronunciation' placeholder={'Enter pronunciation'}>
            {'Pronunciation'}
          </Input>
          <Input type='text' name='example' id='example' placeholder={'Enter example'}>
            {'Example'}
          </Input>
          <Button type='submit'>{'Add word'}</Button>
        </div>
      </form>
    </div>
  )
}
