import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface IList {
  id: string
  title: string
  image?: string | StaticImport | undefined
}
