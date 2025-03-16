export interface IDefaultCollection {
  id: string
  title: string
  image: string
}

export interface IDefaultCollectionGroup {
  _id: string
  title: string
  description: string
  collections: Array<IDefaultCollection>
}
