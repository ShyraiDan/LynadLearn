import { IconType } from 'react-icons'

export interface IPricing {
  duration: string
  price: string
  previousPrice?: string
  tag?: string
  advantages: Array<{
    icon: string
    text: string
  }>
}
