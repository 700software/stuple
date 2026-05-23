import type { SetStateAction } from 'react'
import { useCallback, useMemo, useRef } from 'react'

import { useTriggerRerender } from './react-simple-util'
import {
  applySubSlice,
  asStuple,
  type ObjectNotArray,
  type SetState,
  type Stuple,
  type UsedState,
} from './stuple-core'

export type { SetState, Stuple, UsedState } from './stuple-core'

/**
 * Hook version of {@link subSetState}. The returned `set` keeps the same reference across renders
 * (until `outerSetState` or `key` changes), so it is safe in `useCallback` / `useEffect` dependencies.
 *
 * Prefer this over {@link subSetState} when the setter is created during component render.
 */
export function useSubSetState<
  T extends any[],
  K extends number & keyof T,
  U extends T[K],
>(outerSetState: SetState<T>, key: K, initialValue?: U): SetState<U>
export function useSubSetState<
  T extends ObjectNotArray,
  K extends keyof T,
  U extends T[K],
>(outerSetState: SetState<T>, key: K, initialValue?: U): SetState<U>
export function useSubSetState<
  T extends ObjectNotArray | any[],
  K extends T extends any[] ? number & keyof T : keyof T,
  U extends T[K],
>(outerSetState: SetState<T>, key: K, initialValue?: U): SetState<U> {
  const initialRef = useRef(initialValue)
  initialRef.current = initialValue

  return useCallback(
    (nextValue) => {
      outerSetState((prev) =>
        applySubSlice(
          prev,
          key,
          nextValue as SetStateAction<T[K]>,
          initialRef.current,
        ),
      )
    },
    [outerSetState, key],
  ) as SetState<U>
}

/**
 * React hook version of {@link subStuple}. Prefer this over {@link subStuple} inside components.
 *
 * {@link subStuple} builds a new `set` function on every call, which breaks `useCallback` / `useEffect`
 * dependency lists and can cause infinite fetch loops. `useSubStuple` uses {@link useSubSetState} so `set`
 * stays referentially stable across renders (while `val` still updates when the parent slice changes).
 *
 * @example
 * ```tsx
 * const panels = useStuple<Record<string, PanelState>>(() => ({}))
 * const panel = useSubStuple(panels, activeRepoId, defaultPanelState)
 * // safe: useCallback(() => fetch(panel.val), [panel.set, activeRepoId])
 * ```
 */
export function useSubStuple<
  T extends any[],
  K extends number & keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): Stuple<T[K]>
export function useSubStuple<
  T extends ObjectNotArray,
  K extends keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): Stuple<T[K]>
export function useSubStuple<
  T extends ObjectNotArray | any[],
  K extends T extends any[] ? number & keyof T : keyof T,
  U extends T[K],
>(outerStuple: Stuple<T>, key: K, initialValue?: U): Stuple<T[K]> {
  const parentValue = outerStuple.val
  const initialRef = useRef(initialValue)
  initialRef.current = initialValue

  const val = (
    parentValue[key] === undefined ?
      initialRef.current
    : parentValue[key]) as T[K]

  // @ts-expect-error — overloaded slice types (array vs object parent)
  const set: SetState<T[K]> = useSubSetState(outerStuple.set, key, initialValue)

  return useMemo(() => ({ val, set }), [val, set])
}

/**
 * Wipes and resets the local state value when any dependency changes.
 */
export function useStateWithDeps<T>(init: () => T, deps: any[]): UsedState<T> {
  const valueRef = useRef<{ deps: any[]; value: T }>(undefined)

  const triggerRerender = useTriggerRerender()

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

/**
 * Same as {@link useStateWithDeps} but returns the {@link Stuple} format instead of {@link UsedState}.
 */
export function useStupleWithDeps<T>(init: () => T, deps: any[]): Stuple<T> {
  return asStuple(useStateWithDeps(init, deps))
}
