export * from './redux'

export type primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined
export type primitiveObject = { [key: string]: primitive }

export interface User {
  uid: string
  username: string
  avatar?: string
  status?: string
}

export type Likes = { [key: string]: boolean | null } | null

export interface PostCreate {
  uid: string
  image: string
  description?: string
  date: string
  likes?: Likes
  likesCount: number
}
export interface Post extends PostCreate {
  id: string
  comments?: Array<Comment>
}

export interface PostWithUser extends Post, User {}
