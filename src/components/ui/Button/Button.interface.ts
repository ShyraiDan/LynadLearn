import { ReactNode } from 'react'

export interface IButton {
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
  onClick?: (() => void) | ((e: any) => void)
  disabled?: boolean
  className?: string
}
