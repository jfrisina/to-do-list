import { useReducer, useState } from 'react'
import './App.css'
import Todo from './Todo'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

function reducer(todos, action) { // takes in current state, and thentakes an action from the dispactch function from below
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO: 
      return todos.filter(todo => todo.id !== action.payload.id)

    default: 
    return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false}
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []) // calling reducer function above. 
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name} })
      setName('')
  }

  console.log(todos)

  return (
    <>
      <form onSubmit={handleSubmit}> 
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
      </form>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
      })}
    </>
  )
}

export default App