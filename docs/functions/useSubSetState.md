[**stuple**](../README.md)

***

[stuple](../globals.md) / useSubSetState

# Function: useSubSetState()

## Call Signature

> **useSubSetState**\<`T`, `K`, `U`\>(`outerSetState`, `key`, `initialValue`?): [`SetState`](../type-aliases/SetState.md)\<`U`\>

Defined in: [stuple-memo.ts:22](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/stuple-memo.ts#L22)

Hook version of [subSetState](subSetState.md). The returned `set` keeps the same reference across renders
(until `outerSetState` or `key` changes), so it is safe in `useCallback` / `useEffect` dependencies.

Prefer this over [subSetState](subSetState.md) when the setter is created during component render.

### Type Parameters

#### T

`T` *extends* `any`[]

#### K

`K` *extends* `number`

#### U

`U` *extends* `any`

### Parameters

#### outerSetState

[`SetState`](../type-aliases/SetState.md)\<`T`\>

#### key

`K`

#### initialValue?

`U`

### Returns

[`SetState`](../type-aliases/SetState.md)\<`U`\>

## Call Signature

> **useSubSetState**\<`T`, `K`, `U`\>(`outerSetState`, `key`, `initialValue`?): [`SetState`](../type-aliases/SetState.md)\<`U`\>

Defined in: [stuple-memo.ts:27](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/stuple-memo.ts#L27)

Hook version of [subSetState](subSetState.md). The returned `set` keeps the same reference across renders
(until `outerSetState` or `key` changes), so it is safe in `useCallback` / `useEffect` dependencies.

Prefer this over [subSetState](subSetState.md) when the setter is created during component render.

### Type Parameters

#### T

`T` *extends* [`ObjectNotArray`](../type-aliases/ObjectNotArray.md)

#### K

`K` *extends* `string` \| `number` \| `symbol`

#### U

`U` *extends* `unknown`

### Parameters

#### outerSetState

[`SetState`](../type-aliases/SetState.md)\<`T`\>

#### key

`K`

#### initialValue?

`U`

### Returns

[`SetState`](../type-aliases/SetState.md)\<`U`\>
