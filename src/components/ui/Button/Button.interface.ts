import { ReactNode } from 'react'

export interface IButton {
  children?: ReactNode
  href?: string
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
  onClick?: () => void
}
