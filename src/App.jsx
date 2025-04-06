import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./App.css";

const App = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleInput = (el) => { 
    setText(el.target.value)
  };

  const handleClick = () => {
    if (text.trim() === "") return;
    let newObj = {
      id: uuidv4(),
      todotext: text,
      completed: false,
      createdAt: new Date()
    };
    setTodos([...todos, newObj]);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  const deleteTodo = (id) => {
    const todoElement = document.getElementById(id);
    todoElement.classList.add('fade-out');
    setTimeout(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, 300);
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.todotext);
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, todotext: editText} : todo
    ));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <h1>✨ Task Manager</h1>
        <div className="input-section">
          <input 
            type="text" 
            value={text}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
          />
          <button onClick={handleClick} className="add-btn">
            Add Task
          </button>
        </div>
        <div className="todos-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add one to get started! 🚀</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} id={todo.id} className="todo-item fade-in">
                {editId === todo.id ? (
                  <div className="edit-section">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <button 
                      className="save-btn"
                      onClick={() => saveEdit(todo.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="todo-content">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        className="checkbox"
                      />
                      <span 
                        className={`todo-text ${todo.completed ? 'completed' : ''}`}
                      >
                        {todo.todotext}
                      </span>
                    </div>
                    <div className="button-group">
                      <button 
                        className="edit-btn"
                        onClick={() => startEdit(todo)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
