# Welcome to stuple!

[![npm version](https://img.shields.io/npm/v/stuple.svg)](https://npmjs.org/package/stuple)
[![npm license](https://img.shields.io/npm/l/stuple.svg)](https://npmjs.org/package/stuple)
[![npm type definitions](https://img.shields.io/npm/types/stuple.svg)](https://npmjs.org/package/stuple)

A stuple (pronounced /stŭp′əl/) is very similar to the tuple returned by React's `useState` hook, except that a stuple is an object instead of a hook.

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

## Slicing a state.

A stuple can be sliced into a new stuple with `subStuple` function.

## Nuts and bolts.

`useStuple(...)` is an alias for `asStuple(useState(...))`.

`subStuple(...)` is an alias for `asStuple(subState(...))`.

`subState` is API-compatible with `useState`.

## Full API documentation.

For full documentation, see the [API docs](./docs/README.md).
This documentation is generated from the tsdoc comments in the source code.
Feel free to contact me for questions or make PRs to improve the documentation comments.
