import { IList } from './List.interface'
import mongoose, { Schema } from 'mongoose'

export interface ICategory {
  _id: string
  title: string
  description: string
  lists: Array<IList>
}
