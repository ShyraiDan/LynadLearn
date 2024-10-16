import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import styles from './AddEditDefinitionForm.module.scss'
import { IDefinitionWithId } from '@/interfaces/Word.interface'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { nanoid } from 'nanoid'

import { FaPlus, FaTrash } from 'react-icons/fa'

interface IAddEditDefinitionForm {
  allowedAction: (odj: IDefinitionWithId) => void
  isEdit?: boolean
  definition?: IDefinitionWithId | null
}
export const AddEditDefinitionForm = ({ allowedAction, isEdit, definition }: IAddEditDefinitionForm) => {
  const t = useTranslations('dashboard.vocabulary.modal')
  const [synonymsInput, setSynonymsInput] = useState('')
  const [synonyms, setSynonyms] = useState<string[]>(definition ? definition.synonyms : [])
  const [isDefinitionForm, setDefinitionForm] = useState(false)
  const [examples, setExamples] = useState<string[]>(definition ? definition.examples : [])
  const [exampleInput, setExampleInput] = useState('')
  const [definitionInput, setDefinitionInput] = useState(definition ? definition.definition : '')
  const [partOfSpeech, setPartOfSpeech] = useState(definition ? definition.part_of_speech : '')

  const handleAddSynonym = () => {
    if (synonymsInput) {
      setSynonyms((state) => [...state, synonymsInput])
      setSynonymsInput('')
    }
  }

  const handleAddExample = () => {
    if (exampleInput) {
      setExamples((state) => [...state, exampleInput])
      setExampleInput('')
    }
  }

  const handleAddDefinition = () => {
    allowedAction({
      id: definition ? definition.id : nanoid(),
      definition: definitionInput,
      part_of_speech: partOfSpeech,
      examples: examples,
      synonyms: synonyms,
      category: [],
      level: ''
    })

    setDefinitionForm(false)
    setExamples([])
    setSynonyms([])
    setPartOfSpeech('')
    setDefinitionInput('')
  }

  const handleDeleteSynonym = (item: string) => {
    setSynonyms((state) => state.filter((i) => i !== item))
  }
  const handleDeleteExample = (item: string) => {
    setExamples((state) => state.filter((i) => i !== item))
  }

  return (
    <div className={styles['form-container']}>
      {(isDefinitionForm || isEdit) && (
        <div className={styles['add-definition-form']}>
          <div>
            <div className={styles.meaning}>
              <Input
                type='text'
                name='definition'
                id='definition'
                placeholder={t('enter_definition')}
                value={definitionInput}
                onChange={(e) => setDefinitionInput(e.target.value)}>
                {t('definition')}
              </Input>
            </div>
            <label className={styles['part_of_speech-label']} htmlFor='partOfSpeech'>
              {t('part_of_speech')}
            </label>
            <select
              id='partOfSpeech'
              value={partOfSpeech || undefined}
              onChange={(e) => setPartOfSpeech(e.target.value)}>
              <option value='noun'>{t('noun')}</option>
              <option value='verb'>{t('verb')}</option>
              <option value='adjective'>{t('adjective')}</option>
              <option value='adverb'>{t('adverb')}</option>
              <option value='pronoun'>{t('pronoun')}</option>
              <option value='interjection'>{t('interjection')}</option>
              <option value='conjunction'>{t('conjunction')}</option>
              <option value='preposition'>{t('preposition')}</option>
            </select>
            <p>{t('synonym')}</p>
            <div className={styles.translation}>
              {synonyms.map((item) => (
                <div className={styles.card} key={item}>
                  {item}
                  <span onClick={() => handleDeleteSynonym(item)}>
                    <FaTrash />
                  </span>
                </div>
              ))}

              <div className={styles.controls}>
                <Input
                  type='text'
                  name='example'
                  id='example'
                  placeholder={t('enter_synonym')}
                  onChange={(e) => setSynonymsInput(e.target.value)}
                  value={synonymsInput}
                />

                <Button className={styles['add-translation']} type='button' onClick={() => handleAddSynonym()}>
                  <FaPlus size={20} />
                </Button>
              </div>
            </div>

            <p>{t('example')}</p>
            <div className={styles.exams}>
              <ul className={styles.content}>
                {examples.map((item: string, index: number, i) => (
                  <li key={index}>
                    <div>
                      <span className={styles.dot}></span>
                      <p>{item}</p>
                    </div>
                    <span className={styles.trash} onClick={() => handleDeleteExample(item)}>
                      <FaTrash />
                    </span>
                  </li>
                ))}
              </ul>
              <Input
                type='text'
                name='example'
                id='example'
                placeholder={t('enter_example')}
                onChange={(e) => setExampleInput(e.target.value)}
                value={exampleInput}
              />
              <Button className={styles['add-example']} type='button' onClick={() => handleAddExample()}>
                {t('add_example')}
              </Button>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.submit} type='button' onClick={() => handleAddDefinition()}>
              {t('add_definition')}
            </Button>
            <Button className={styles.reset} type='reset' onClick={() => setDefinitionForm((state) => !state)}>
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}
      {!isDefinitionForm && !isEdit && (
        <Button className={styles['add-definition']} type='button' onClick={() => setDefinitionForm((state) => !state)}>
          {t('add_definition')}
        </Button>
      )}
    </div>
  )
}
