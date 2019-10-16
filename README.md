# use-deep-update-callback

> A callback that will immutably update an object accoring to a given path.

[![NPM](https://img.shields.io/npm/v/use-deep-update-callback.svg)](https://www.npmjs.com/package/use-deep-update-callback) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-deep-update-callback
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-deep-update-callback'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [korbinancell](https://github.com/korbinancell)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
