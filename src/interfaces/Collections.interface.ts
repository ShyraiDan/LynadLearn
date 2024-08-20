import { StaticImageData } from 'next/image'

export interface ICollectionsGroup {
  id: string
  title: string
  titleUa: string
  description: string
  descriptionUa: string
  collections: Array<ICollections>
}

export interface ICollections {
  id: string
  title: string
  image: StaticImageData
  description: string
  titleUa: string
  descriptionUa: string
  lessons: number
  words: number
}
