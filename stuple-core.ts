import type { SetStateAction } from 'react'
import { useState } from 'react'

import type {
  ObjectNotArray,
  SetState,
  SimpleState,
  SimpleStuple,
  Stuple,
  UsedState,
} from './types'

export type {
  ObjectNotArray,
  SetState,
  SetStateSimple,
  SimpleState,
  SimpleStuple,
  Stuple,
  UsedState,
} from './types'

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

/**
 * Apply a child-key update to a parent state object (shared by {@link subSetState} and {@link useSubSetState}).
 */
export function applySubSlice<
  T extends ObjectNotArray | any[],
  K extends T extends any[] ? number & keyof T : keyof T,
  U extends T[K],
>(prev: T, key: K, nextValue: SetStateAction<T[K]>, initialValue?: U): T {
  const prevChild =
    (prev as T)[key] === undefined ? initialValue : (prev as T)[key]
  const newChildValue =
    typeof nextValue === 'function' ?
      (nextValue as (oldState: T[K]) => T[K])(prevChild as T[K])
    : nextValue
  if (newChildValue === (prev as T)[key]) return prev

  const newParentValue = { ...prev, [key]: newChildValue } as T
  if (Array.isArray(prev)) return Object.assign([], newParentValue) as T
  return newParentValue
}

/**
 * Slice a child stuple from parent state. Not a hook — returns a new `set` on every call.
 * In components, prefer {@link useSubStuple} so `set` stays referentially stable.
 */
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
  // @ts-expect-error // needed because we are using overloaded function types (any[] vs ObjectNotArray)
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
  const setChild: SetState<U> = (nextValue) => {
    outerSetState((prev) =>
      applySubSlice(prev, key, nextValue as SetStateAction<T[K]>, initialValue),
    )
  }
  return setChild
}
