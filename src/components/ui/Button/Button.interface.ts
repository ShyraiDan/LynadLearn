import { ReactNode } from 'react'

export interface IButton {
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}
