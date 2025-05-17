[**stuple**](../README.md)

***

[stuple](../globals.md) / SimpleState

# Type Alias: SimpleState\<T\>

> **SimpleState**\<`T`\> = readonly \[`T`, [`SetStateSimple`](SetStateSimple.md)\<`T`\>\]

Defined in: [index.ts:30](https://github.com/700software/stuple/blob/2869931f62716450da37ebc5ae56851979d9d9a0/index.ts#L30)

The same as [UsedState](UsedState.md), except that the setter function can only take a value as a parameter,
not a function as would normally be permitted by React's `setState`.

See [SetStateSimple](SetStateSimple.md)

## Type Parameters

### T

`T`
