/* To Do Component Layout -------------------------------------------------------------*/
//imports
import React from 'react' 
import { ACTIONS } from './App' 

function Todo({ todo, dispatch }) {
	const disabledButton = !todo.complete
	return (
		<div className="todo-item">
			<input 
				type="checkbox" 
				checked={todo.complete} 
				onChange={() => dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: todo.id }})} />
			<span style={{ color: todo.complete ? '#AAA' : '#000' }}> {todo.name}</span>
			<button onClick={() => dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: todo.id }})}>Edit</button>
			<button disabled={disabledButton} onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id }})}>Delete</button>
		</div>
	)
}

export default Todo