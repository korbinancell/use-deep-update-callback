# use-deep-update-callback

> A callback that will immutably update an object according to a given path.

[![NPM](https://img.shields.io/npm/v/use-deep-update-callback.svg)](https://www.npmjs.com/package/use-deep-update-callback) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add use-deep-update-callback
```

## Usage

```tsx
import React, { useState } from 'react'
import { useDeepUpdateCallback } from 'use-deep-update-callback'

const Example = () => {
  const [state, setState] = useState({ inputValues: { nameInput: { value: '' } } });
  const onChange = useDeepUpdateCallback(state, ['inputValues', 'nameInput', 'value'], setState);

  return (
    <div>
      <input value={state} onChange={event => onChange(event.target.value)} />
    </div>
  )
}
```

## License

MIT © [korbinancell](https://github.com/korbinancell)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
