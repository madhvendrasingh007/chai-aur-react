import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter, setCounter] = useState(15);
  return (
    <>
      <h1>Counter</h1>
      <button 
      onClick={addValue}>Add Value</button>
      <button 
      onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
