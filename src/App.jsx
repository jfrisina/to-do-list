// import 
import { useReducer, useState } from 'react'
import './App.css'
import Data from './components/data'

// reducer function
function reducer(state, action) {
  // code goes here

}

// app code
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>To Do List</h1>        
      <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      <Data />
    </>
  )
}

export default App

