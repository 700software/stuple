import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useReducer, useRef, useState } from 'react'

export type Stuple<T> = { val: T; set: SetState<T> }

export type UsedState<T> = readonly [T, SetState<T>]

export type SetState<T> = Dispatch<SetStateAction<T>>

export function useStuple<T>(): Stuple<T | undefined>
export function useStuple<T = undefined>(initialValue?: T): Stuple<T>
export function useStuple<T = undefined>(initialValue?: T): Stuple<T> {
  // @ts-ignore
  return asStuple(useState(initialValue))
}

export function asStuple<Tuple extends UsedState<any>>(
  tuple: Tuple,
): Tuple extends UsedState<infer T>
  ? Stuple<T>
  : { val: Tuple[0]; set: Tuple[1] } {
  // @ts-ignore
  return {
    val: tuple[0],
    set: tuple[1],
  }
}

export function useStupleWithDeps<T>(init: () => T, deps: any[]): Stuple<T> {
  const valueRef = useRef<{ deps: any[]; value: T }>()

  const triggerRerender = useReducer(() => ({}), {})[1]

  const set: SetState<T> = useCallback(
    (nextState: SetStateAction<T>) => {
      const newValue =
        typeof nextState === 'function'
          ? (nextState as (oldState: T) => T)(valueRef.current!.value)
          : nextState
      const different = valueRef.current!.value !== newValue
      valueRef.current!.value = newValue
      if (different) triggerRerender()
    },
    [triggerRerender],
  )

  if (!valueRef.current) {
    valueRef.current = { deps, value: init() }
  } else {
    if (!valueRef.current.deps.every((v, i) => v === deps[i])) {
      valueRef.current = { deps, value: init() }
    }
  }

  return { val: valueRef.current.value, set }
}

export type KeyOf<T> = T extends readonly any[] ? number & keyof T : keyof T

export function subStuple<T, K extends KeyOf<T>, U extends T[K]>(
  outerStuple: Stuple<T>,
  key: K,
  initialValue?: U,
): Stuple<T[K]> {
  // @ts-ignore
  return asStuple(subState(outerStuple, key, initialValue))
}

export function subState<T, K extends KeyOf<T>, U extends T[K]>(
  outerStuple: Stuple<T>,
  key: K,
  initialValue?: U,
): UsedState<U> {
  const parentValue = outerStuple.val
  const setParentState = outerStuple.set
  return [
    // @ts-ignore
    parentValue[key] === undefined ? initialValue : parentValue[key],
    (nextValue) => {
      setParentState((prev) => {
        const newChildValue =
          typeof nextValue === 'function'
            ? (nextValue as any)(
                prev[key] === undefined ? initialValue : prev[key],
              )
            : nextValue
        if (nextValue === prev[key]) return prev // unchanged

        const newParentValue = { ...prev, [key]: newChildValue }
        if (Array.isArray(prev)) return Object.assign([], newParentValue)
        return newParentValue
      })
    },
  ]
}
