/* To Do Component Layout -------------------------------------------------------------*/
//imports
import React from 'react' 
import { ACTIONS } from '../App' 
import { useState } from 'react'

function Todo({ todo, dispatch }) {
	const disabledButton = !todo.complete

	const [editMode, setEditMode] = useState(false)
	const [editedTodo, setEditedTodo] = useState(todo.name)

	const handleEdit = () => {
		setEditMode(true)
		setEditedTodo(todo.name)
	}

	const handleSave = () => {
		dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: todo.id, newName: editedTodo } })
		setEditMode(false)
		setEditedTodo('')
	}

	const handleInputChange = (event) => {
		setEditedTodo(event.target.value)
	}

	const handleCancel = () => {
		setEditMode(false)
		setEditedTodo('')
	}

	const handleDelete = () => {
		dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
	}

	return (
		<div className="todo-item">
			{editMode ? (
				<>
					<input type="text" value={editedTodo} onChange={handleInputChange} />
					<button onClick={handleSave}>Save</button>
					<button onClick={handleCancel}>Cancel</button>	
				</>
			) : (
				<>
					<input type="checkbox" checked={todo.complete} onChange={() => dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: todo.id }})} />
					<span style={{ color: todo.complete ? '#AAA' : '#000', textDecoration: todo.complete ? 'line-through' : 'none' }}> {todo.name}</span>
					<button onClick={handleEdit}>Edit</button>
					<button disabled={disabledButton} onClick={handleDelete}>Delete</button>
				</>
			)}
		</div>
	)
}

export default Todo