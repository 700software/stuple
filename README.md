# Welcome to stuple!

[![npm version](https://img.shields.io/npm/v/stuple.svg)](https://npmjs.org/package/stuple)
[![npm license](https://img.shields.io/npm/l/stuple.svg)](https://npmjs.org/package/stuple)
[![npm type definitions](https://img.shields.io/npm/types/stuple.svg)](https://npmjs.org/package/stuple)

A stuple (pronounced /stŭp′əl/) is very similar to the tuple returned by React's `useState` hook, except that a stuple is an object instead of an array.

so you can access the tuple's value and setter function by dot notation instead of array destructuring (or worse, array index notation).

Have you ever found yourself doing excessive prop drilling?

For example,

```tsx
<MyNameComponent
  firstName={firstName}
  setFirstName={setFirstName}
  middleName={middleName}
  setMiddleName={setMiddleName}
  lastName={lastName}
  setLastName={setLastName}
/>
```

And asked yourself, is there an easy way to cut the props in half?

Yes!

Simply replace,

```tsx
const [firstName, setFirstName] = useState('')
```

With,

```tsx
const firstNameSt = useStuple('')
```

And now you can do,

```tsx
<MyNameComponent
  firstNameSt={firstNameSt}
  lastNameSt={lastNameSt}
  middleNameSt={middleNameSt}
/>
```

And inside of `MyNameComponent`, you can access `firstNameSt.val` and `firstNameSt.set`.

## Slicing state

### Inside React components: `useSubStuple`

Use **`useSubStuple(outerStuple, key, initialValue?)`** when slicing parent state in a component. It returns a child `Stuple` whose **`set` function keeps the same reference** across renders (via `useCallback`), so you can safely list it in `useCallback` / `useEffect` dependencies.

```tsx
const panelsByRepo = useStuple<Record<string, PanelState>>(() => ({}))
const panel = useSubStuple(panelsByRepo, activeRepoId, defaultPanelState)

useEffect(() => {
  void loadStatus(panel.val)
}, [panel.set, activeRepoId]) // panel.set is stable — no infinite loop
```

### Outside render / one-off reads: `subStuple`

**`subStuple`** is a plain function (not a hook). It is fine for event handlers or non-React code, but **do not call it during render** to pass a slice into a child that puts `set` in hook dependency arrays — each render creates a **new** `set` function and can cause infinite loops. Use **`useSubStuple`** instead.

## Package layout

| Module              | Contents                                                                  |
| ------------------- | ------------------------------------------------------------------------- |
| `react-simple-util` | `useTriggerRerender`, `useAlwaysLatest`                                   |
| `stuple-core`       | Types, `useStuple`, `asStuple`, `subStuple`, `subState`, `subSetState`    |
| `stuple-memo`       | `useSubStuple`, `useSubSetState`, `useStateWithDeps`, `useStupleWithDeps` |

Import everything from `"stuple"` as before, or import from subpaths by file if you prefer tree-shaking in custom setups.

## Nuts and bolts.

`useStuple(...)` is an alias for `asStuple(useState(...))`.

`subStuple(...)` is an alias for `asStuple(subState(...))`.

`useSubStuple(...)` is the hook form of `subStuple` with a stable `set` (via `useSubSetState`).

`useSubSetState(...)` is the hook form of `subSetState` with a stable setter.

`subState` is API-compatible with `useState`.

## Full API documentation.

For full documentation, see the [API docs](https://github.com/700software/stuple/tree/main/docs).
This documentation is generated from the tsdoc comments in the source code.
Feel free to contact me for questions or make PRs to improve the documentation comments.
