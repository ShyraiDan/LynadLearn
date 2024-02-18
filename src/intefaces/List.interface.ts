import { StaticImageData } from 'next/image'

export interface IList {
  id: string
  title: string
  image: string | StaticImageData
}
