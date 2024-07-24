import { IconType } from 'react-icons'

export interface IAchievement {
  id: string
  title: string
  description: string
  icon: IconType
  target: number
  type: string
}
