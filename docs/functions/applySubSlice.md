[**stuple**](../README.md)

***

[stuple](../globals.md) / applySubSlice

# Function: applySubSlice()

> **applySubSlice**\<`T`, `K`, `U`\>(`prev`, `key`, `nextValue`, `initialValue`?): `T`

Defined in: [stuple-core.ts:47](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/stuple-core.ts#L47)

Apply a child-key update to a parent state object (shared by [subSetState](subSetState.md) and [useSubSetState](useSubSetState.md)).

## Type Parameters

### T

`T` *extends* `any`[] \| [`ObjectNotArray`](../type-aliases/ObjectNotArray.md)

### K

`K` *extends* `string` \| `number`

### U

`U`

## Parameters

### prev

`T`

### key

`K`

### nextValue

`SetStateAction`\<`T`\[`K`\]\>

### initialValue?

`U`

## Returns

`T`
