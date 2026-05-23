import type { Dispatch, SetStateAction } from 'react'

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

/** Shorthand alias type for the vanilla React set state function. */
export type SetState<T> = Dispatch<SetStateAction<T>>

/**
 * This type indicates that you accept a set state function, similar to {@link SetState},
 * but that you never intend to pass a function to it
 * so the implementation could be a simpler non-vanilla-React alternative if the consumer desires.
 */
export type SetStateSimple<T> = (nextState: T) => void

export type ObjectNotArray = Record<string, unknown>
