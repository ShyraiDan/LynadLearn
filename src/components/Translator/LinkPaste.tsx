import { ChangeEvent } from 'react'
import { FaLink } from 'react-icons/fa'

interface ILinkPasteProps {
  handleLinkPaste: (e: ChangeEvent<HTMLInputElement>) => void
}

const LinkPaste = ({ handleLinkPaste }: ILinkPasteProps) => (
  <label htmlFor='link-input' className='cursor-pointer'>
    <FaLink className='text-gray-400' size={21} />
    <input type='text' id='link-input' className='hidden' onChange={handleLinkPaste} />
  </label>
)

export default LinkPaste
