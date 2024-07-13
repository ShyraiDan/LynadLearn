import { IList } from './List.interface'

export interface ICategory {
  _id: string
  title: string
  description: string
  lists: Array<IList>
}
