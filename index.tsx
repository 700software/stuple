import type { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type UsedState<T> = [T, SetState<T>]

export function stuple<Tuple extends UsedState<any>>(stateReturn: Tuple) {
  return {
    val: stateReturn[0],
    set: stateReturn[1],
  }
}
