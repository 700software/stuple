[**stuple**](../README.md)

***

[stuple](../globals.md) / SimpleState

# Type Alias: SimpleState\<T\>

> **SimpleState**\<`T`\> = readonly \[`T`, [`SetStateSimple`](SetStateSimple.md)\<`T`\>\]

Defined in: [types.ts:29](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/types.ts#L29)

The same as [UsedState](UsedState.md), except that the setter function can only take a value as a parameter,
not a function as would normally be permitted by React's `setState`.

See [SetStateSimple](SetStateSimple.md)

## Type Parameters

### T

`T`
