import React from 'react'

import { useMyHook } from 'use-deep-update-callback'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
