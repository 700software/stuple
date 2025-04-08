[**stuple**](../README.md)

***

[stuple](../README.md) / SetStateSimple

# Type Alias: SetStateSimple()\<T\>

> **SetStateSimple**\<`T`\> = (`nextState`) => `void`

Defined in: [index.ts:30](https://github.com/700software/stuple/blob/7e5fa576c70a45df912927e83344e58e412141e4/index.ts#L30)

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
