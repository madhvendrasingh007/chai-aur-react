import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter, setCounter] = useState(15);

  const addValue = () => {
    console.log('Adding value', counter);
    setCounter(counter + 1);
  }

  const removeValue = () => {
    console.log('Removing value', counter);
    setCounter(counter - 1);
  }

  return (
    <>
      <h1>Counter</h1>
      <button 
      onClick={addValue}>Add Value {counter} </button>
      <button 
      onClick={removeValue}>Remove Value {counter} </button>
    </>
  )
}

export default App
