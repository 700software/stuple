[**stuple**](../README.md)

***

[stuple](../globals.md) / SetStateSimple

# Type Alias: SetStateSimple()\<T\>

> **SetStateSimple**\<`T`\> = (`nextState`) => `void`

Defined in: [index.ts:42](https://github.com/700software/stuple/blob/16d3a88d65a5c689946e059424116e5180fb7aa3/index.ts#L42)

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
