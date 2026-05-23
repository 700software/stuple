import { useReducer, useRef } from 'react'

/** Force a re-render without changing React state. */
export function useTriggerRerender() {
  return useReducer(() => ({}), {})[1]
}

/** Ref whose `.current` is always the latest value from the most recent render. */
export function useAlwaysLatest<T>(latestValue: T) {
  const ref = useRef(latestValue)
  ref.current = latestValue
  return ref
}
