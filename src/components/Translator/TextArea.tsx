import { ChangeEvent } from 'react'

interface ITextAreaProps {
  id: string
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
}

const TextArea = ({ id, value, onChange, placeholder }: ITextAreaProps) => (
  <textarea
    rows={5}
    id={id}
    className='py-2.5 px-4 border-none focus:outline-none block w-full border-transparent 
    rounded-lg resize-none'
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)

export default TextArea
