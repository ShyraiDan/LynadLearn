import { StaticImageData } from 'next/image'

export interface IFeatures {
  id: number
  icon: string | StaticImageData
  title: string
  description: string
}
