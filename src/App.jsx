// imports
import { useReducer, useState, useEffect } from 'react'
import './App.css'
import Todo from './components/Todo'
//import Data from './components/Data'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  COMPLETE_TODO: 'complete-todo',
  DELETE_TODO: 'delete-todo', 
  EDIT_TODO: 'edit-todo'
}

function reducer(todos, action) { // takes in current state, and then takes an action from the dispatch function from below
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.COMPLETE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO: 
      return todos.filter(todo => todo.id !== action.payload.id)
    case ACTIONS.EDIT_TODO:
      return  todos.map(todo => {
        if (todo.id !== action.payload.id) {
          return { ...todo, name: action.payload.newName }
        }
        return todo})
    default: 
    return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false}
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])//Data) // calling reducer function above. 
  const [name, setName] = useState('')

  // Change title of app on tab
  useEffect(() => {
    document.title = "To Do List";
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name} })
      setName('')
  }

  // sort to do items by newest added first
  const sortedTodos = [...todos].sort((a, b) => b.id - a.id)

  return (
    <>
      <form onSubmit={handleSubmit}> 
        <h1>To Do List</h1>
        <input type="text" placeholder="Task goes here" value={name} onChange={event => setName(event.target.value)} />
        <button type="submit">Add to List</button>
      </form>
      {sortedTodos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      })}
    </>
  )
}

export default App