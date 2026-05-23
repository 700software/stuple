[**stuple**](../README.md)

***

[stuple](../globals.md) / SetStateSimple

# Type Alias: SetStateSimple()\<T\>

> **SetStateSimple**\<`T`\> = (`nextState`) => `void`

Defined in: [types.ts:39](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/types.ts#L39)

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
