import { AnyAction, AnyActionType } from '@typings/redux'

const action = (type: AnyActionType, payload?: unknown): AnyAction =>
  (({
    type,
    payload
  } as unknown) as AnyAction)

export default action
