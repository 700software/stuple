[**stuple**](../README.md)

***

[stuple](../globals.md) / SimpleStuple

# Type Alias: SimpleStuple\<T\>

> **SimpleStuple**\<`T`\> = `object`

Defined in: [types.ts:15](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/types.ts#L15)

A stuple backed by [SetStateSimple](SetStateSimple.md) instead of [SetState](SetState.md) / [UsedState](UsedState.md).

This simplified stuple cannot be sliced with [subStuple](../functions/subStuple.md) or [subState](../functions/subState.md),
but is still useful for cutting prop drilling in half.

## Type Parameters

### T

`T`

## Properties

### set

> **set**: [`SetStateSimple`](SetStateSimple.md)\<`T`\>

Defined in: [types.ts:15](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/types.ts#L15)

***

### val

> **val**: `T`

Defined in: [types.ts:15](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/types.ts#L15)
