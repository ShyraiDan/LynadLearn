import { StaticImageData } from 'next/image'

export interface IReview {
  id: number
  name: string
  avatar: string | StaticImageData
  text: string
}
