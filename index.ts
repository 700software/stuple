import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useReducer, useRef, useState } from 'react'

/**
 * Object form of React's `useState` return value {@link UsedState}.
 * @example { val: value, set: setValue }
 */
export type Stuple<T> = { val: T; set: SetState<T> }

/**
 * A stuple backed by {@link SetStateSimple} instead of {@link SetState} / {@link UsedState}.
 *
 * This simplified stuple cannot be sliced with {@link subStuple} or {@link subState},
 * but is still useful for cutting prop drilling in half.
 */
export type SimpleStuple<T> = { val: T; set: SetStateSimple<T> }

/**
 * This is simply the return value of React's `useState`
 * @example [value, setValue]
 */
export type UsedState<T> = readonly [T, SetState<T>]

/**
 * The same as {@link UsedState}, except that the setter function can only take a value as a parameter,
 * not a function as would normally be permitted by React's `setState`.
 *
 * See {@link SetStateSimple}
 */
export type SimpleState<T> = readonly [T, SetStateSimple<T>]

/**
 * Shorthand alias type for the vanilla React set state function.
 */
export type SetState<T> = Dispatch<SetStateAction<T>>

/**
 * This type indicates that you accept a set state function, similar to {@link SetState},
 * but that you never intend to pass a function to it
 * so the implementation could be a simpler non-vanilla-React alternative if the consumer desires.
 */
export type SetStateSimple<T> = (nextState: T) => void

export function useStuple<T>(): Stuple<T | undefined>
export function useStuple<T = undefined>(initialValue: T | (() => T)): Stuple<T>
export function useStuple<T = undefined>(
  initialValue?: T | (() => T),
): Stuple<T> {
  return asStuple(useState(initialValue)) as Stuple<T>
}

export function asStuple<Tuple extends UsedState<any> | SimpleState<any>>(
  tuple: Tuple,
) {
  type ReturnType =
    Tuple extends UsedState<infer T> ? Stuple<T>
    : Tuple extends SimpleState<infer T> ? SimpleStuple<T>
    : { val: Tuple[0]; set: Tuple[1] }
  return {
    val: tuple[0],
    set: tuple[1],
  } as ReturnType
}

export function subStuple<
  T extends any[],
  K extends number & keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): Stuple<T[K]>
export function subStuple<
  T extends ObjectNotArray,
  K extends keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): Stuple<T[K]>
export function subStuple<
  T extends ObjectNotArray | any[],
  K extends T extends any[] ? number & keyof T : keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): Stuple<T[K]> {
  // @ts-expect-error // needed because we are using overloaded function types (any[] vs ObjectNotArray) (which is needed for type-tests.ts to pass type checks)
  return asStuple(subState(outerStuple as any, key, initialValue))
}

export function subState<
  T extends any[],
  K extends number & keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): UsedState<U>
export function subState<
  T extends ObjectNotArray,
  K extends keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): UsedState<U>
export function subState<
  T extends ObjectNotArray | any[],
  K extends T extends any[] ? number & keyof T : keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): UsedState<U> {
  const parentValue = outerStuple.val
  const setParentState = outerStuple.set
  return [
    parentValue[key] === undefined ? initialValue : parentValue[key],
    // @ts-expect-error // needed because we are using overloaded function types (any[] vs ObjectNotArray)
    subSetState(setParentState, key, initialValue),
  ] as UsedState<U>
}

export function subSetState<
  T extends any[],
  K extends number & keyof T,
  U extends T[K],
>(outerSetState: SetState<T>, key: K, initialValue?: U): SetState<U>
export function subSetState<
  T extends ObjectNotArray,
  K extends keyof T,
  U extends T[K],
>(outerSetState: SetState<T>, key: K, initialValue?: U): SetState<U>
export function subSetState<
  T extends ObjectNotArray | any[],
  K extends T extends any[] ? number & keyof T : keyof T,
  U extends T[K],
>(outerSetState: SetState<T>, key: K, initialValue?: U): SetState<U> {
  return (nextValue) => {
    outerSetState((prev) => {
      const newChildValue =
        typeof nextValue === 'function' ?
          (nextValue as any)(prev[key] === undefined ? initialValue : prev[key])
        : nextValue
      if (nextValue === prev[key]) return prev // unchanged

      const newParentValue = { ...prev, [key]: newChildValue }
      if (Array.isArray(prev)) return Object.assign([], newParentValue)
      return newParentValue
    })
  }
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

  const triggerRerender = useRerenderTrigger()

  const set: SetState<T> = useCallback(
    (nextState: SetStateAction<T>) => {
      const newValue =
        typeof nextState === 'function' ?
          (nextState as (oldState: T) => T)(valueRef.current!.value)
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

export function useRerenderTrigger() {
  return useReducer(() => ({}), {})[1]
}

export type ObjectNotArray = Record<string, unknown>
