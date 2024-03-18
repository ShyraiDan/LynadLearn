import { StaticImageData } from 'next/image'

export interface ISections {
  id: number
  title: string
  icon: string | StaticImageData
  text: string
}
