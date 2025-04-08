[**stuple**](../README.md)

***

[stuple](../globals.md) / SetStateSimple

# Type Alias: SetStateSimple()\<T\>

> **SetStateSimple**\<`T`\> = (`nextState`) => `void`

Defined in: [index.ts:42](https://github.com/700software/stuple/blob/b84a98dbc1e143b866c355af845d2b37e38561cb/index.ts#L42)

This type indicates that you accept a set state function, similar to [SetState](SetState.md),
but that you never intend to pass a function to it
so the implementation could be a simpler non-vanilla-React alternative if the consumer desires.

## Type Parameters

### T

`T`

## Parameters

### nextState

`T`

## Returns

`void`
