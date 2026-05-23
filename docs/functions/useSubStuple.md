[**stuple**](../README.md)

***

[stuple](../globals.md) / useSubStuple

# Function: useSubStuple()

## Call Signature

> **useSubStuple**\<`T`, `K`, `U`\>(`outerStuple`, `key`, `initialValue`?): [`Stuple`](../type-aliases/Stuple.md)\<`T`\[`K`\]\>

Defined in: [stuple-memo.ts:69](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/stuple-memo.ts#L69)

React hook version of [subStuple](subStuple.md). Prefer this over [subStuple](subStuple.md) inside components.

[subStuple](subStuple.md) builds a new `set` function on every call, which breaks `useCallback` / `useEffect`
dependency lists and can cause infinite fetch loops. `useSubStuple` uses [useSubSetState](useSubSetState.md) so `set`
stays referentially stable across renders (while `val` still updates when the parent slice changes).

### Type Parameters

#### T

`T` *extends* `any`[]

#### K

`K` *extends* `number`

#### U

`U` *extends* `any`

### Parameters

#### outerStuple

[`Stuple`](../type-aliases/Stuple.md)\<`T`\>

#### key

`K`

#### initialValue?

`U`

### Returns

[`Stuple`](../type-aliases/Stuple.md)\<`T`\[`K`\]\>

### Example

```tsx
const panels = useStuple<Record<string, PanelState>>(() => ({}))
const panel = useSubStuple(panels, activeRepoId, defaultPanelState)
// safe: useCallback(() => fetch(panel.val), [panel.set, activeRepoId])
```

## Call Signature

> **useSubStuple**\<`T`, `K`, `U`\>(`outerStuple`, `key`, `initialValue`?): [`Stuple`](../type-aliases/Stuple.md)\<`T`\[`K`\]\>

Defined in: [stuple-memo.ts:74](https://github.com/700software/stuple/blob/ee05ab4773b0cb13fd2c782ff2fae9c556c8811e/stuple-memo.ts#L74)

React hook version of [subStuple](subStuple.md). Prefer this over [subStuple](subStuple.md) inside components.

[subStuple](subStuple.md) builds a new `set` function on every call, which breaks `useCallback` / `useEffect`
dependency lists and can cause infinite fetch loops. `useSubStuple` uses [useSubSetState](useSubSetState.md) so `set`
stays referentially stable across renders (while `val` still updates when the parent slice changes).

### Type Parameters

#### T

`T` *extends* [`ObjectNotArray`](../type-aliases/ObjectNotArray.md)

#### K

`K` *extends* `string` \| `number` \| `symbol`

#### U

`U` *extends* `unknown`

### Parameters

#### outerStuple

[`Stuple`](../type-aliases/Stuple.md)\<`T`\>

#### key

`K`

#### initialValue?

`U`

### Returns

[`Stuple`](../type-aliases/Stuple.md)\<`T`\[`K`\]\>

### Example

```tsx
const panels = useStuple<Record<string, PanelState>>(() => ({}))
const panel = useSubStuple(panels, activeRepoId, defaultPanelState)
// safe: useCallback(() => fetch(panel.val), [panel.set, activeRepoId])
```
