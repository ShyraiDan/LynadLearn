'use client'

import { useState } from 'react'
import styles from './AddingWordForm.module.scss'
import { Modal } from '@/components/ui/Modal/Modal'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { removeScrollBar } from '@/constants/shared'

import { FaPlus } from 'react-icons/fa'

export const AddingWordForm = () => {
  const [isAdding, setAdding] = useState(false)

  const showModal = () => {
    setAdding((state) => !state)
    removeScrollBar(isAdding)
  }

  return (
    <>
      <div className={styles.add} onClick={() => showModal()}>
        <FaPlus fill={'white'} size={16} />
      </div>
      {isAdding && (
        <Modal isOpen={isAdding} handleClose={() => showModal()}>
          <div className={styles.modal}>
            <h2>Add a new word</h2>
            <p>Enter details of the new word</p>
            <form action='' className={styles.form}>
              <div>
                <div className={styles.row}>
                  <div>
                    <Input type='text' name='word' id='word' placeholder={'Your word'}>
                      {'New word'}
                    </Input>
                  </div>
                  <div>
                    <label htmlFor='partOfSpeech'>Part of speech</label>
                    <select name='partOfSpeech' id='partOfSpeech'>
                      <option value=''>Noun</option>
                      <option value=''>Verb</option>
                      <option value=''>Adjective</option>
                      <option value=''>Adverb</option>
                      <option value=''>Pronoun</option>
                      <option value=''>Interjection</option>
                      <option value=''>Conjunction</option>
                      <option value=''>Preposition</option>
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
        </Modal>
      )}
    </>
  )
}
