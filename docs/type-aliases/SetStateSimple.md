[**stuple**](../README.md)

***

[stuple](../globals.md) / SetStateSimple

# Type Alias: SetStateSimple()\<T\>

> **SetStateSimple**\<`T`\> = (`nextState`) => `void`

Defined in: [index.ts:42](https://github.com/700software/stuple/blob/2869931f62716450da37ebc5ae56851979d9d9a0/index.ts#L42)

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
