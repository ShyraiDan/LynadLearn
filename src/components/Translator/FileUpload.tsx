import { ChangeEvent } from 'react'

import { FaPaperclip } from 'react-icons/fa'

interface IFileUploadProps {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

const FileUpload = ({ handleFileUpload }: IFileUploadProps) => (
  <label htmlFor="file-upload" className="cursor-pointer">
    <FaPaperclip className="text-gray-400" size={21} />
    <input type="file" id="file-upload" onChange={handleFileUpload} className="hidden" />
  </label>
)

export default FileUpload
