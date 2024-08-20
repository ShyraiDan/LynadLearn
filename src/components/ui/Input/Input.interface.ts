import { HTMLInputTypeAttribute, ReactNode } from 'react'
export interface IInput {
  type: HTMLInputTypeAttribute | undefined
  placeholder?: string
  name: string
  id: string
  required?: boolean
  children?: ReactNode
  onChange?: (e: any) => void
  value?: string
  checked?: boolean
  obj?: Object
}
