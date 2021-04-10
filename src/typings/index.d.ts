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
