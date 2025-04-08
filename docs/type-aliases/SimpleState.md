[**stuple**](../README.md)

***

[stuple](../globals.md) / SimpleState

# Type Alias: SimpleState\<T\>

> **SimpleState**\<`T`\> = readonly \[`T`, [`SetStateSimple`](SetStateSimple.md)\<`T`\>\]

Defined in: [index.ts:30](https://github.com/700software/stuple/blob/b84a98dbc1e143b866c355af845d2b37e38561cb/index.ts#L30)

The same as [UsedState](UsedState.md), except that the setter function can only take a value as a parameter,
not a function as would normally be permitted by React's `setState`.

See [SetStateSimple](SetStateSimple.md)

## Type Parameters

### T

`T`
