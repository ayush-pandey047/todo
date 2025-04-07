import React from 'react'
import { useState } from 'react'  
import './App.css'

const App = () => {
  const [text, setText] = useState("")  
  const [todos, setTodos] = useState([]) 
  const [editingId, setEditingId] = useState(null)

  const handleInput = (e) => {
    const newValue = e.target.value
    console.log('Input value:', newValue) // Debug log
    setText(newValue)
  }

  const handleClick = () => {
    if (text.trim()) {  
      setTodos([...todos, { id: Date.now(), text: text }])  
      setText("")  
    }
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id)
    setText(todoToEdit.text)
    setEditingId(id)
  }

  const handleUpdate = () => {
    if (text.trim()) {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: text } : todo
      ))
      setText("")
      setEditingId(null)
    }
  }

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      <div className="todo-input">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          onChange={handleInput}
          value={text}
          autoComplete="off"
          spellCheck="false"
        />
        {editingId ? (
          <button onClick={handleUpdate}>Update Task</button>
        ) : (
          <button onClick={handleClick}>Add Task</button>
        )}
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <p>{todo.text}</p>
            <div className="todo-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App