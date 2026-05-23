/** stuple — object-shaped `useState` with optional slicing and memoized hook variants. */

export { useAlwaysLatest, useTriggerRerender } from './react-simple-util'

export {
  applySubSlice,
  asStuple,
  subSetState,
  subState,
  subStuple,
  useStuple,
} from './stuple-core'

export type {
  ObjectNotArray,
  SetState,
  SetStateSimple,
  SimpleState,
  SimpleStuple,
  Stuple,
  UsedState,
} from './types'

export {
  useStateWithDeps,
  useStupleWithDeps,
  useSubSetState,
  useSubStuple,
} from './stuple-memo'
