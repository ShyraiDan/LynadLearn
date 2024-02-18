import { IList } from './List.interface'

export interface ICategory {
  id: string
  title: string
  description: string
  lists: Array<IList>
}
