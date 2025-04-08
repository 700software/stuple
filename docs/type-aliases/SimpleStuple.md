[**stuple**](../README.md)

***

[stuple](../globals.md) / SimpleStuple

# Type Alias: SimpleStuple\<T\>

> **SimpleStuple**\<`T`\> = `object`

Defined in: [index.ts:16](https://github.com/700software/stuple/blob/16d3a88d65a5c689946e059424116e5180fb7aa3/index.ts#L16)

A stuple backed by [SetStateSimple](SetStateSimple.md) instead of [SetState](SetState.md) / [UsedState](UsedState.md).

This simplified stuple cannot be sliced with [subStuple](../functions/subStuple.md) or [subState](../functions/subState.md),
but is still useful for cutting prop drilling in half.

## Type Parameters

### T

`T`

## Properties

### set

> **set**: [`SetStateSimple`](SetStateSimple.md)\<`T`\>

Defined in: [index.ts:16](https://github.com/700software/stuple/blob/16d3a88d65a5c689946e059424116e5180fb7aa3/index.ts#L16)

***

### val

> **val**: `T`

Defined in: [index.ts:16](https://github.com/700software/stuple/blob/16d3a88d65a5c689946e059424116e5180fb7aa3/index.ts#L16)
