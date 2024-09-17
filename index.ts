import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useReducer, useRef, useState } from 'react'

/**
 * Object form of React's `useState` return value. {@link UsedState}
 * @example { val: value, set: setValue }
 */
export type Stuple<T> = { val: T; set: SetState<T> }

/**
 * This is simply the return value of React's `useState`
 * @example [value, setValue]
 */
export type UsedState<T> = readonly [T, SetState<T>]

/**
 * Shorthand alias type for the vanilla React set state function.
 */
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

/**
 * Same as {@link useStateWithDeps} but returns the tuple {@link Stuple} format instead of {@link UsedState} format.
 */
export function useStupleWithDeps<T>(init: () => T, deps: any[]): Stuple<T> {
  return asStuple(useStateWithDeps(init, deps))
}

/**
 * Wipes and resets the local state value of any of the deps change.
 */
export function useStateWithDeps<T>(init: () => T, deps: any[]): UsedState<T> {
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

  return [valueRef.current.value, set]
}
