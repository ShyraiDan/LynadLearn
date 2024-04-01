import { ReactNode } from 'react'

export interface IModal {
  children: ReactNode
  isOpen: boolean
  handleClose: () => void
  className?: string
}
