/* eslint-disable react-hooks/rules-of-hooks */
//------------------------------------------------------------------------------

import type { ObjectNotArray } from '.'
import { subStuple, useStuple } from '.'

const alternate1 = { a: 1, b: 2 }
const alternate2 = { a: 1, c: 3 }

const newLocal = Math.random() ? alternate1 : alternate2
const parentStuple = useStuple(newLocal)

subStuple(parentStuple, 'a')
// @ts-expect-error
subStuple(parentStuple, 'b')

//------------------------------------------------------------------------------

type Satisfy<Required, Actual extends Required> = Actual

type testPass = Satisfy<ObjectNotArray, { a: 1 }>
// @ts-expect-error
type testError = Satisfy<ObjectNotArray, any[]>

//------------------------------------------------------------------------------
