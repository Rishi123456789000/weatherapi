import React from 'react'
import {Weather} from './api/weatherapi.jsx'
import MultiAsync from './Promiseall/apicalls.jsx'

const App = () => {
  return (
    <div>
      <Weather/>
      <MultiAsync/>
    </div>
  )
}

export default App
