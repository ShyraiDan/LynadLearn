import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import styles from './AddEditDefinitionForm.module.scss'
import { IDefinitionWithId } from '@/interfaces/Word.interface'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { P } from '@/components/ui/Typography/Typography'

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
  const [emptyDefinition, setEmptyDefinition] = useState(false)

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
    if (!partOfSpeech && !definitionInput && !examples.length && !synonyms.length) {
      setEmptyDefinition(true)
      return
    }

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
        <div className={twMerge(styles['add-definition-form'], 'dark:!bg-[#1D2D4D]')}>
          <div>
            <div className={styles.meaning}>
              <Input
                type="text"
                name="definition"
                id="definition"
                placeholder={t('enter_definition')}
                value={definitionInput}
                onChange={(e) => setDefinitionInput(e.target.value)}
              >
                {t('definition')}
              </Input>
            </div>

            <label className={twMerge(styles['part_of_speech-label'], 'dark:text-grey-600')} htmlFor="partOfSpeech">
              {t('part_of_speech')}
            </label>
            <select
              id="partOfSpeech"
              value={partOfSpeech || undefined}
              onChange={(e) => setPartOfSpeech(e.target.value)}
              className="dark:bg-[#17294c] dark:ml-[1px] dark:!border-[#ffffff20] dark:!text-grey-600"
            >
              <option value="noun">{t('noun')}</option>
              <option value="verb">{t('verb')}</option>
              <option value="adjective">{t('adjective')}</option>
              <option value="adverb">{t('adverb')}</option>
              <option value="pronoun">{t('pronoun')}</option>
              <option value="interjection">{t('interjection')}</option>
              <option value="conjunction">{t('conjunction')}</option>
              <option value="preposition">{t('preposition')}</option>
            </select>
            <P className="m-0 text-[1rem] mt-4 mb-2 font-semibold first-letter:uppercase">{t('synonym')}</P>
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
                  type="text"
                  name="example"
                  id="example"
                  placeholder={t('enter_synonym')}
                  onChange={(e) => setSynonymsInput(e.target.value)}
                  value={synonymsInput}
                />

                <Button className={styles['add-translation']} type="button" onClick={() => handleAddSynonym()}>
                  <FaPlus size={20} />
                </Button>
              </div>
            </div>

            <P className="m-0 text-[1rem] mt-4 mb-2 font-semibold first-letter:uppercase">{t('example')}</P>
            <div className={styles.exams}>
              <ul className={styles.content}>
                {examples.map((item: string, index: number) => (
                  <li key={index}>
                    <div>
                      <span className={styles.dot}></span>
                      <P className="m-0 text-lg font-semibold first-letter:uppercase">{item}</P>
                    </div>
                    <span
                      className={twMerge(styles.trash, 'dark:text-grey-600')}
                      onClick={() => handleDeleteExample(item)}
                    >
                      <FaTrash />
                    </span>
                  </li>
                ))}
              </ul>
              <Input
                type="text"
                name="example"
                id="example"
                placeholder={t('enter_example')}
                onChange={(e) => setExampleInput(e.target.value)}
                value={exampleInput}
              />
              <Button className={styles['add-example']} type="button" onClick={() => handleAddExample()}>
                {t('add_example')}
              </Button>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.submit} type="button" onClick={() => handleAddDefinition()}>
              {t('add_definition')}
            </Button>
            <Button
              className={twMerge(
                styles.reset,
                'dark:!border-white-100 dark:!text-white-100 dark:hover:!border-red dark:hover:!text-red'
              )}
              type="reset"
              onClick={() => setDefinitionForm((state) => !state)}
            >
              {t('cancel')}
            </Button>
          </div>
          {emptyDefinition && (
            <P className="font-semibold mb-2 first:mt-0 text-[1rem] text-red mt-1.5 text-sm">
              You can&apos;t submit empty definition
            </P>
          )}
        </div>
      )}
      {!isDefinitionForm && !isEdit && (
        <Button className={styles['add-definition']} type="button" onClick={() => setDefinitionForm((state) => !state)}>
          {t('add_definition')}
        </Button>
      )}
    </div>
  )
}
