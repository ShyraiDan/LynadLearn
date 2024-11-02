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
    rounded-lg resize-none dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600'
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)

export default TextArea
